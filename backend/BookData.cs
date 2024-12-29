using backend.DTO.request;

namespace backend
{
    public class BookData
    {
        public static List<AddBookDTO> Books { get; } = new List<AddBookDTO>
        {
            new AddBookDTO { id = 1, title = "Book 1", author = "Author 1", isbn = "1234567890", publicationDate = new DateOnly(2020, 1, 1) },
            new AddBookDTO { id = 2, title = "Book 2", author = "Author 2", isbn = "0987654321", publicationDate = new DateOnly(2021, 5, 10) },
            new AddBookDTO { id = 3, title = "Book 1", author = "Author 1", isbn = "1234567890", publicationDate = new DateOnly(2020, 1, 1) },
            new AddBookDTO { id = 4, title = "Book 2", author = "Author 2", isbn = "0987654321", publicationDate = new DateOnly(2021, 5, 10) },
            new AddBookDTO { id = 5, title = "Book 1", author = "Author 1", isbn = "1234567890", publicationDate = new DateOnly(2020, 1, 1) },
            new AddBookDTO { id = 6, title = "Book 2", author = "Author 2", isbn = "0987654321", publicationDate = new DateOnly(2021, 5, 10) }
        };
    }
}
