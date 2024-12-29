namespace backend.DTO.request
{
    public class AddBookDTO
    {
        public int id { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string isbn { get; set; }
        public DateOnly publicationDate { get; set; }
    }
}
