using backend.DTO;
using backend.DTO.paginated;
using backend.DTO.request;
using backend.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/v1/book")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BookService bookService;
        public BooksController(BookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpGet("get-all-books")]
        public IActionResult getAllBooks([FromQuery] int pageSize)
        {
            BooksPaginatedDTO booksPaginatedDTO = bookService.getAllBooks(pageSize);
            StandardResponse response = new StandardResponse(
                200,
                "RETRIEVED SUCCESSFULLY",
                booksPaginatedDTO);
            return Ok(response);
        }

        [HttpPost("add-book")]
        public IActionResult addBook([FromBody] AddBookDTO addBookDTO)
        {
            AddBookDTO addBookDTO1 = bookService.addBook(addBookDTO);
            StandardResponse response = new StandardResponse(
                201,
                "ADDED SUCCESSFULLY",
                addBookDTO1);
            return Ok(response);
        }

        [HttpPut("update-book")]
        public IActionResult updateBook([FromBody] AddBookDTO addBookDTO, [FromQuery] int id)
        {
            AddBookDTO addBookDTO1 = bookService.updateBook(addBookDTO, id);
            StandardResponse response = new StandardResponse(
                200,
                "UPDATED SUCCESSFULLY",
                addBookDTO1);
            return Ok(response);
        }

        [HttpGet("get-book-by-id")]
        public IActionResult getBookById([FromQuery] int id)
        {
            AddBookDTO addBookDTO = bookService.getBookById(id);
            StandardResponse response = new StandardResponse(
                200,
                "RETRIEVED SUCCESSFULLY",
                addBookDTO);
            return Ok(response);
        }

        [HttpDelete("delete-book")]
        public IActionResult deleteBook([FromQuery] int id)
        {
            AddBookDTO addBookDTO = bookService.deleteBook(id);
            StandardResponse response = new StandardResponse(
                200,
                "DELETED SUCCESSFULLY",
                addBookDTO);
            return Ok(response);
        }

        [HttpGet("get-books-by-name")]
        public IActionResult getBooksByName([FromQuery] string position, [FromQuery] int pageSize)
        {
            BooksPaginatedDTO booksPaginatedDTO = bookService.getBooksByName(position, pageSize);
            StandardResponse response = new StandardResponse(
                200,
                "RETRIEVED SUCCESSFULLY",
                booksPaginatedDTO);
            return Ok(response);
        }
    }
}
