using backend.DTO.paginated;
using backend.DTO.request;
using backend.Exception;

namespace backend.Service.IMPL
{
    public class BookServiceIMPL : BookService
    {
        public AddBookDTO addBook(AddBookDTO addBookDTO)
        {
            AddBookDTO addBookDTO1 = BookData.Books.Find(book=> book.isbn == addBookDTO.isbn);
            if (addBookDTO1 == null) {
                addBookDTO.id = BookData.Books.Count + 1;
                BookData.Books.Add(addBookDTO);
                return BookData.Books[BookData.Books.Count - 1];
            }
            else
            {
                throw new AlredayExistException("Book already exists");
            }
        }

        public AddBookDTO deleteBook(int id)
        {
            int num = BookData.Books.FindIndex(book => book.id == id);
            if (num >= 0 && num <= BookData.Books.Count - 1)
            {
                AddBookDTO addBookDTO = BookData.Books[num];
                BookData.Books.RemoveAt(num);
                return addBookDTO;
            }
            else
            {
                throw new NotFoundException("Book doesn't exist");
            }
        }

        public BooksPaginatedDTO getAllBooks(int pageSize)
        {
            BooksPaginatedDTO booksPaginatedDTO = new BooksPaginatedDTO();
            if (BookData.Books.Count > 0) {
                if (pageSize < BookData.Books.Count)
                {
                    List<AddBookDTO> list = new List<AddBookDTO>();
                    int i = 0;
                    while (i < pageSize)
                    {
                        list.Add(BookData.Books[i]);
                        i++;
                    }
                    booksPaginatedDTO.addBookDTOs = list;
                }
                else
                {
                    booksPaginatedDTO.addBookDTOs = BookData.Books;
                }
                booksPaginatedDTO.count = BookData.Books.Count;
                return booksPaginatedDTO;
            }
            else
            {
                throw new NotFoundException("There aren't books");
            }
        }

        public AddBookDTO getBookById(int id)
        {
            AddBookDTO bookDTO = BookData.Books.FirstOrDefault(book => book.id == id);
            if (bookDTO == null)
            {
                throw new NotFoundException("Book doesn't exist");
            }
            else
            {
                return bookDTO;
            }

        }

        public BooksPaginatedDTO getBooksByName(string position, int pageSize)
        {
            BooksPaginatedDTO booksPaginatedDTO = new BooksPaginatedDTO();
            List<AddBookDTO> filteredBooks = BookData.Books
                .Where(book => book.title.Contains(position, StringComparison.OrdinalIgnoreCase))
                .ToList();

            booksPaginatedDTO.addBookDTOs = filteredBooks;
            booksPaginatedDTO.count = filteredBooks.Count;
            return booksPaginatedDTO;
        }

        public AddBookDTO updateBook(AddBookDTO addBookDTO, int id)
        {
            int num = BookData.Books.FindIndex(book => book.id == id);
            if (num>=0 && num<=BookData.Books.Count-1) {
                
                BookData.Books[num] = addBookDTO;
                return BookData.Books[id - 1];
            }
            else
            {
                throw new NotFoundException("Book doesn't exist");
            }
        }
    }
}
