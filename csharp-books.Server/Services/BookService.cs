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




}