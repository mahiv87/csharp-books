using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace csharp_books.Server.Controllers
{
  public class BookController : BaseController
  {
    private readonly IServiceProvider _serviceProvider;
    public BookController(IServiceProvider serviceProvider)
    {
      _serviceProvider = serviceProvider;
    }

    [HttpGet("secure/currentloans")]
    public ActionResult<List<ShelfCurrentLoansResponse>> CurrentLoans([FromHeader] string Authorization)
    {
      try
      {
        string userEmail = ExtractUserEmail(Authorization);
        var loans = _serviceProvider.CurrentLoans(userEmail);
        return Ok(loans);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }




  }
}