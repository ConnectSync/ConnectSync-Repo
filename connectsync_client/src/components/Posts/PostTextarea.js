import React,{useState} from "react"
import { connect } from "react-redux";
import { addPost, addPostWithImage } from "../../redux/action/posts";
import { Redirect } from "react-router-dom";
import Checkbox from "./Checkbox"
import "./PostTextareaStyles.css"

const PostTextarea = (props) => {
    const {
        isAuthenticated,
        user: { workplaces, _id },
        addPost,
        addPostWithImage,
      } = props;

      console.log("Post Propsss ",workplaces)

      const selectedWorkplace = workplaces.map((workplace) => {
        const { status } = workplace;
        if (status === "JOINED" || status === "ADDED") {
          const {
            workplace: { name: workplaceName },
          } = workplace;
          return workplaceName;
        }
      });
      const workPlaceState = selectedWorkplace.map((item, index) => {
        return {
          id: index,
          name: item,
          isChecked: false,
        };
      });
      const [post, setPost] = useState({
        text: "",
        workplaceObj: workPlaceState,
        postImg: "",
        formData: new FormData(),
        succes: false,
      });
      const [img, setImg] = useState("");
    
      const { text, workplaceObj, formData, postImg, success } = post;


    const showElem = (e) => {
        if (e.target.value !== "" && e.target.value !== " ") {
          document.querySelector(".select-workplace").style.display = "block";
        } else {
          document.querySelector(".select-workplace").style.display = "none";
        }
      };

      const handleCustomBtn = (e) => {
        const fileBtn = document.getElementById("postImg");
        fileBtn.click();
      };
    
      const handleChange = (name) => (e) => {
        console.log("Name ", name);
        if (name === "postImg") {
          if (e.target.value) {
            document.querySelector(".toggle").style.display = "block";
            document.getElementById("custom-text").innerHTML = imageHandler(e).name;
            document.querySelector(".select-workplace").style.display = "block";
          } else {
            document.getElementById("custom-text").innerHTML = "Choose file..";
          }
        }
        const value = name === "postImg" ? imageHandler(e) : e.target.value;
        console.log("value ", value);
        formData.set(name, value);
        setPost({ ...post, [name]: value });
      };
    
      const imageHandler = (e) => {
        console.log("File name ", e.target.files[0].name);
        const reader = new FileReader();
        setPost({ ...post, postImg: e.target.files[0].name });
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImg(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        return e.target.files[0];
      };
      const handleCheckBox = (e) => {
        let workPlaceArray = workplaceObj;
        workPlaceArray.forEach((item) => {
            console.log("Item ",item)
          if (item.name === e.target.name) {
            item.isChecked = e.target.checked;
          }
        });
        setPost({ ...post, workplaceObj: workPlaceArray });
      };
    
      const conditionRender = () => {
        const temp = workplaceObj.some((value, index, array) => {
          return value.isChecked === true;
        });
    
        if (temp) {
          return (
            <div className="text-right p-2">
              <button onClick={createPost} className="btn btn-style btn-sm">
                Post
              </button>
            </div>
          );
        } else {
          return null;
        }
      };
    

      
      const createPost = async (event) => {
        console.log("POST BTN")
        event.preventDefault();
        const fileBtn = document.getElementById("postImg");
        const workPlaceNames = post.workplaceObj.map((item) => {
          return item.name;
        });
        if (fileBtn.value) {
          await addPostWithImage(formData, workPlaceNames);
        } else {
          const postData = {
            text,
          };
          await addPost(postData, workPlaceNames);
        }
        setPost({ ...post, success: true });
      };
      const performRedirect = () => {
        if (success) {
          setPost({
            ...post,
            text: "",
            workplaceObj: workPlaceState,
            postImg: "",
            formData: new FormData(),
            success: false,
          });
          console.log("Redirect");
          return <Redirect to="/home" />;
        }
      };

    return (
        <div>
      <div className="bg-white"></div>
      <div className="text-area">
        <form>
          <textarea
            className="text-input form-control p-3"
            onInput={showElem}
            rows="5"
            value={text}
            onChange={handleChange("text")}
            placeholder="Start Typing...."
          ></textarea>
        </form>
      </div>
      <div className="">
        <input
          type="file"
          name="postImg"
          hidden="hidden"
          accept="image/*"
          onChange={handleChange("postImg")}
          className=""
          id="postImg"
        />
        <div>
          <button
            onClick={handleCustomBtn}
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
            <img src={img} alt="hello" className="img img-display mb-3" />
          </div>
        </div>
      </div>
      <div className="select-workplace bg-white">
        <p className="lead text-center py-2">Send To</p>
        <ul className="list-group">
          {workplaceObj.map((item, index) => {
            return (
              <Checkbox key={index} {...item} handleCheckBox={handleCheckBox} />
            );
          })}
        </ul>
        {conditionRender()}
      </div>
      {performRedirect()}
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
    };
  };
  
  export default connect(mapStateToProps, { addPost, addPostWithImage })(
    PostTextarea
  );