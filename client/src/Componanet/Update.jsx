import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Update() {
    const { id } = useParams();

    const [cover, setCover] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [price, setPrice] = useState(0);
    const [tags, setTags] = useState("");

    useEffect(() => {
       
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://bookstrore-fkfv.onrender.com/getBooks/${id}`);
            const { cover, title, description, genre, publishDate, price, tags } = response.data;
            setCover(cover);
            setTitle(title);
            setDescription(description);
            setGenre(genre);
            setPublishDate(publishDate);
            setPrice(price);
            setTags(tags);
        } catch (err) {
            console.error(err);
        }
    };

    const navigate = useNavigate();

   const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const updatedBook = {
            cover,
            title,
            description,
            genre,
            publishDate,
            price,
            tags,
        };

        // You might want to confirm the update with the user here

        const response = await axios.put(`https://bookstrore-fkfv.onrender.com/update/${id}`, updatedBook);

        // Check the response for success or handle accordingly
        if (response.status === 200) {
            // Optionally, you can provide a success message or notification
            console.log("Book updated successfully");
            
            // Redirect to a specific page or the updated item
            navigate("/");
        } else {
            console.error("Failed to update book");
        }
    } catch (err) {
        // Provide a user-friendly error message or notification
        console.error("Error updating book:", err);
    }
};


    return (
        <div className="d-flex vh-100  justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update Book</h2>
                    <div className="mb-2">
                        <label htmlFor="cover">Cover</label>
                        <input
                            type="text"
                            id="cover"
                            placeholder="Enter Cover"
                            className="form-control"
                            value={cover}
                            onChange={(e) => setCover(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter Title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            placeholder="Enter Description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="genre">Genre</label>
                        <input
                            type="text"
                            id="genre"
                            placeholder="Enter Genre"
                            className="form-control"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="publishDate">Publish Date</label>
                        <input
                            type="date"
                            id="publishDate"
                            className="form-control"
                            value={publishDate}
                            onChange={(e) => setPublishDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Enter Price"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tags">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            placeholder="Enter Tags"
                            className="form-control"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Update;
