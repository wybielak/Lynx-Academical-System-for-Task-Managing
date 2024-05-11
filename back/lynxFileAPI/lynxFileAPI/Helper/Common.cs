namespace API.FileProcessing.Helper
{
    public static class Common
    {
        public static string GetCurrentDirectory()
        {
            var result = Directory.GetCurrentDirectory();
            return result;
        }
        public static string GetStaticContentDirectory()
        {
            var result = Path.Combine(Directory.GetCurrentDirectory(), "lynxUploadsPOLSL\\");
            if (!Directory.Exists(result))
            {
                Directory.CreateDirectory(result);
            }
            return result;
        }
        public static string GetFilePath(string FileName, string _SubjectName, string _StudentName, string _TaskName)
        {
            var _GetStaticContentDirectory = GetStaticContentDirectory();

            var filePath = Path.Combine(_GetStaticContentDirectory, _SubjectName, _StudentName, _TaskName, FileName);

            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
            }

            return filePath;
        }

        public static string GetDFilePath(string _SubjectName, string _StudentName, string _TaskName)
        {
            var _GetStaticContentDirectory = GetStaticContentDirectory();

            var filePath = Path.Combine(_GetStaticContentDirectory, _SubjectName, _StudentName, _TaskName);

            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
            }

            return filePath;
        }
    }
}
