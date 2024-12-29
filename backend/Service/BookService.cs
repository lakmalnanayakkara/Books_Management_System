using backend.DTO.paginated;
using backend.DTO.request;

namespace backend.Service
{
    public interface BookService
    {
        AddBookDTO addBook(AddBookDTO addBookDTO);
        AddBookDTO deleteBook(int id);
        BooksPaginatedDTO getAllBooks(int pageSize);
        AddBookDTO getBookById(int id);
        BooksPaginatedDTO getBooksByName(string position, int pageSize);
        AddBookDTO updateBook(AddBookDTO addBookDTO, int id);
    }
}
