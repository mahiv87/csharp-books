using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using csharp_books.Server.Services;

namespace csharp_books.Server.Controllers
{
  public class BookController : BaseController
  {
    private readonly IBookService _bookService;
    public BookController(IBookService bookService)
    {
      _bookService = bookService;
    }

    [HttpGet("secure/currentloans")]
    public ActionResult<List<ShelfCurrentLoansResponse>> CurrentLoans([FromHeader] string Authorization)
    {
      try
      {
        string userEmail = ExtractUserEmail(Authorization);
        var loans = _bookService.CurrentLoans(userEmail);
        return Ok(loans);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet("secure/currentloans/count")]
    public ActionResult<int> CurrentLoansCount([FromHeader] string Authorization)
    {
      try
      {
        string userEmail = ExtractUserEmail(Authorization);
        int count = _bookService.CurrentLoansCount(userEmail);
        return Ok(count);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }




  }
}