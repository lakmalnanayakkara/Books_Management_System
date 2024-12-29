using backend.DTO.request;

namespace backend.DTO.paginated
{
    public class BooksPaginatedDTO
    {
        public List<AddBookDTO> addBookDTOs { get; set; }
        public int count { get; set; }
    }
}
