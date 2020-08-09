import React from "react"
import Checkbox from "./Checkbox"

const PostTextarea = (props) => {

    const showElem = (e) => {
        // if (e.target.value !== "" && e.target.value !== " ") {
        //   document.querySelector(".select-workplace").style.display = "block";
        // } else {
        //   document.querySelector(".select-workplace").style.display = "none";
        // }
      };

      
      const handleCustomBtn = (e) => {
        const fileBtn = document.getElementById("postImg");
        fileBtn.click();
      };

    return (
        <div>
            <div className="text-area">
                <form>
                    <textarea
                    className="text-input form-control p-3"
                    onInput=""
                    rows="5"
                    value=""
                    onChange=""
                    placeholder="Start Typing...."
                    ></textarea>
                </form>
            </div>
            <div>
                <input
                 type="file"
                name="postImg"
                hidden="hidden"
                accept="image/*"
                onChange=""
                id="postImg"
                />
                <div>
                    <button
                        onClick=""
                        type="button"
                        id="custom-button"
                        className="btn btn-secondary mr-3"
                        >
                        Upload
                    </button>
                    <span id="custom-text">No file chosen yet</span>
                </div>
                <div className="toggle">
                    <div className="img-holder text-center mt-2">
                    <img src="..." alt="hello" className="img img-display mb-3" />
                     </div>
                </div>
                <div className="select-workplace bg-white">
                    <p className="lead text-center py-2">Send To</p>
                    <ul>
                        <Checkbox />
                    </ul>
                    {/* conditional render */}
                </div>  
            </div>

        </div>
    )
}

export default PostTextarea