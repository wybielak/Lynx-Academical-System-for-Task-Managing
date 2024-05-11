using lynxFileAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace lynxFileAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileManagerController : ControllerBase
    {
        //https://www.youtube.com/watch?v=bN64VNISNw0

        private readonly IManageFile _iManageImage;
        public FileManagerController(IManageFile iManageImage)
        {
            _iManageImage = iManageImage;
        }

        [HttpPost]
        [Route("uploadfile")]
        public async Task<IActionResult> UploadFile(IFormFile _IFormFile, string _SubjectName, string _StudentName, string _TaskName)
        {
            var result = await _iManageImage.UploadFile(_IFormFile, _SubjectName, _StudentName, _TaskName);
            return Ok(result);
        }

        [HttpGet]
        [Route("downloadfile")]
        public async Task<IActionResult> DownloadFile(string _SubjectName, string _StudentName, string _TaskName)
        {
            var result = await _iManageImage.DownloadFile(_SubjectName, _StudentName, _TaskName);
            return File(result.Item1, result.Item2, result.Item3);
        }

    }
}
