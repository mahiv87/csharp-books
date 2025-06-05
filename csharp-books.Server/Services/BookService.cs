using csharp_books.Server.Models;
using csharp_books.Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace csharp_books.Server.Services
{
  private readonly IBookRepository _bookRepository;
  private readonly ICheckoutRepository _checkoutRepository;
  private readonly IHistoryRepository _historyRepository;

  public BookService(IBookRepository bookRepository)
  {
    _bookRepository = bookRepository;
  }

  // Checks out a book to the user and updates the book's available copies, and creates a new checkout record
  public async Task<Book> CheckoutBookAsync(string userEmail, long bookId)
  {
    var book = await _bookRepository.GetByIdAsync(bookId);
    var validateCheckout = await _checkoutRepository.FindByUserEmailAndBookIdAsync(userEmail, bookId);

    if (book == null || validateCheckout != null || book.CopiesAvailable <= 0)
    {
      throw new InvalidOperationException("Book not available for checkout.");
    }

    book.CopiesAvailable--;
    await _bookRepository.SaveAsync(book);

    var checkout = new Checkout
    {
      userEmail = userEmail,
      CheckoutDate = DateTime.Now.ToString("yyyy-MM-dd"),
      ReturnDate = DateTime.Now.AddDays(7).ToString("yyyy-MM-dd"),
      BookId = bookId
    };

    await _checkoutRepository.SaveAsync(checkout);
    return book;
  }

  // Checks if a specific book is checked out by a given user
  public async Task<bool> IsBookCheckedOutByUserAsync(string userEmail, long bookId)
  {
    var checkout = await _checkoutRepository.FindByUserEmailAndBookIdAsync(userEmail, bookId);
    return checkout != null;
  }

  // Gets the count of books currently checked out by a user
  public async Task<int> CurrentLoansCountAsync(string userEmail)
  {
    var checkoutList = await _checkoutRepository.FindBooksByUserEmailAsync(userEmail);
    return checkoutList.Count;
  }

  // Gets a list of currently checked-out books for a user, including the number of days left before return
  public async Task<List<ShelfCurrentLoansResponse>> CurrentLoansAsync(string userEmail)
  {
    var shelfCurrentLoansResponses = new List<ShelfCurrentLoansResponse>();
    var checkoutList = await _checkoutRepository.FindBooksByUserEmailAsync(userEmail);
    var bookIdList = checkoutList.Select(c => c.BookId).ToList();
    var books = await _bookRepository.GetBooksByIdsAsync(bookIdList);

    foreach (var book in books)
    {
      var checkout = checkoutList.FirstOrDefault(c => c.BookId == book.Id);
      if (checkout != null)
      {
        var returnDate = DateTime.Parse(checkout.ReturnDate);
        var now = DateTime.Now;
        var daysLeft = (returnDate - now).Days;

        shelfCurrentLoansResponses.Add(new ShelfCurrentLoansResponse(book, daysLeft));
      }
    }

    return shelfCurrentLoansResponses;
  }

  // Returns a book that was checked out by the user and updates the book's available copies,
  // deletes the checkout record, and saves the transaction to history
  public async Task ReturnBookAsync(string userEmail, long bookId)
  {
    var book = await _bookRepository.GetByIdAsync(bookId);
    var validateCheckout = await _checkoutRepository.FindByUserEmailAndBookIdAsync(userEmail, bookId);

    if (book == null || validateCheckout == null)
    {
      throw new InvalidOperationException("Book not checked out by user.");
    }

    book.CopiesAvailable++;
    await _bookRepository.SaveAsync(book);

    await _checkoutRepository.DeleteAsync(validateCheckout.Id);

    var history = new History
    {
      UserEmail = userEmail,
      CheckoutDate = validateCheckout.CheckoutDate,
      ReturnDate = DateTime.Now.ToString("yyyy-MM-dd"),
      BookTitle = book.Title,
      BookAuthor = book.Author,
      BookDescription = book.Description,
      BookImg = book.Img
    };


    await _historyRepository.SaveAsync(history);
  }


  // Renews the loan period for a book checked out by the user
  public async Task RenewLoanAsync(string userEmail, long bookId)
  {
    var validateCheckout = await _checkoutRepository.FindByUserEmailAndBookIdAsync(userEmail, bookId);

    if (validateCheckout == null)
    {
      throw new InvalidOperationException("Book not checked out by user.");
    }

    var returnDate = DateTime.Parse(validateCheckout.ReturnDate);
    var now = DateTime.Now;

    if (returnDate >= now)
    {
      validateCheckout.ReturnDate = now.AddDays(7).ToString("yyyy-MM-dd");
      await _checkoutRepository.SaveAsync(validateCheckout);
    }
  }


}