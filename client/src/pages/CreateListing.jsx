import Navbar from "../component/Navbar"
import "../styles/CreateListing.scss"
import { categories, facilities, types } from "../data"
import { RemoveCircleOutline,AddCircleOutline } from "@mui/icons-material"
//import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot"
import {DragDropContext,Draggable,Droppable} from "react-beautiful-dnd"
import {IoIosImages} from "react-icons/io"
import { BiTrash } from "react-icons/bi"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//import variables from "../styles/variables.scss"
const CreateListing = () => {
    
    const navigate=useNavigate()
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
   

     /* LOCATION */
    const [formLocation, setFormLocation] = useState({
        streetAddress: "",
        aptSuite: "",
        city: "",
        province: "",
        country: "",
    });

    const handleChangeLocation = (e) => {
        const { name, value } = e.target;
        setFormLocation({
        ...formLocation,
        [name]: value,
        });
    };

    //console.log(formLocation);

    /* BASIC COUNTS */
    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    
    /* AMENITIES */
    const [amenities, setAmenities] = useState([]);

    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
        setAmenities((prevAmenities) =>
            prevAmenities.filter((option) => option !== facility)
        );
        } else {
        setAmenities((prev) => [...prev, facility]);
        }
    };
    



//   upload drag and drop
  const [photos,setPhotos]=useState([])

  const handleUploadPhotos=(e)=>{
    const newPhotos=e.target.files
    setPhotos((prevPhotos)=>([...prevPhotos,...newPhotos]))
  }
  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };


  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId=useSelector((state)=>state.user._id)
  const handlePost=async(e)=>{
      e.preventDefault();
      try {
         /* Create a new FormData onject to handle file uploads */
            const listingForm = new FormData();
            listingForm.append("creator", creatorId);
            listingForm.append("category", category);
            listingForm.append("type", type);
            listingForm.append("streetAddress", formLocation.streetAddress);
            listingForm.append("aptSuite", formLocation.aptSuite);
            listingForm.append("city", formLocation.city);
            listingForm.append("province", formLocation.province);
            listingForm.append("country", formLocation.country);
            listingForm.append("guestCount", guestCount);
            listingForm.append("bedroomCount", bedroomCount);
            listingForm.append("bedCount", bedCount);
            listingForm.append("bathroomCount", bathroomCount);
            listingForm.append("amenities", amenities);
            listingForm.append("title", formDescription.title);
            listingForm.append("description", formDescription.description);
            listingForm.append("highlight", formDescription.highlight);
            listingForm.append("highlightDesc", formDescription.highlightDesc);
            listingForm.append("price", formDescription.price);
            
              /* Append each selected photos to the FormData object */
            photos.forEach((photo) => {
                listingForm.append("listingPhotos", photo);
            });

              /* Send a POST request to server */
            const response = await fetch("http://localhost:3001/properties/create", {
                method: "POST",
                body: listingForm,
            });

            if (response.ok) {
                navigate("/");
            }
        
        } 
            catch (error) {
                console.log("Publish listining failed",error.message);
             }
  }

  return (
    <>
      <Navbar/>

      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost} >
            {/* step 1 */}
            <div className="create-listing_step1">
                <h2>Step:1 Tell us about your place</h2>
                <hr/>
                <h3> Which categoriy decribe your place</h3>
                    <div className="category-list">
                    {categories?.map((item,index)=>(
                        <div  className={`category ${
                                category === item.label ? "selected" : ""
                            }`}
                            key={index} onClick={()=>setCategory(item.label)}>
                            <div className="category_icon">{item.icon}</div>
                            <p>{item.label}</p>
                        </div>
                    ))}
                    </div>
                {/* Type of place  */}
                <h3> What type of place will guest have?</h3>
                        <div className="type-list">
                          {types?.map((item,index)=>(
                            <div
                                className={`type ${type === item.name ? "selected" : ""}`}
                                key={index}
                                onClick={() => setType(item.name)}
                                >
                                <div className="type_text">
                                  <h4>{item.name}</h4>
                                  <p>{item.description}</p>
                                </div>
                                <div className="type_icon">
                                   {item.icon}
                                </div> 
                            </div>
                        ))}
                        </div>
                {/* Location */}
                <h3>Where is your place located?</h3>
                   <div className="full">
                    <div className="location">
                        <p>Street Address</p>
                        <input
                        type="text"
                        placeholder="Street Address"
                        name="streetAddress"
                        required
                        value={formLocation.streetAddress}
                        onChange={handleChangeLocation}

                        />
                    </div>
                  </div>

                    <div className="half">
                        <div className="location">
                            <p>Apartment, Suite, etc. (if applicable)</p>
                            <input
                            type="text"
                            placeholder="Apt, Suite, etc. (if applicable)"
                            name="aptSuite"
                            required
                            value={formLocation.aptSuite}
                            onChange={handleChangeLocation}
                            />
                        </div>
                    <div className="location">
                            <p>City</p>
                            <input
                            type="text"
                            placeholder="City"
                            name="city"
                            required
                            value={formLocation.city}
                            onChange={handleChangeLocation}
                            />
                        </div>
                    </div>

                    <div className="half">
                        <div className="location">
                            <p>Province</p>
                            <input
                            type="text"
                            placeholder="Province"
                            name="province"
                            required
                            value={formLocation.province}
                            onChange={handleChangeLocation}
                            />
                        </div>
                    <div className="location">
                            <p>Country</p>
                            <input
                            type="text"
                            placeholder="Country"
                            name="country"
                            required
                            value={formLocation.country}
                            onChange={handleChangeLocation}
                            />
                        </div>
                    </div>
                {/* Guest number */}
                <h3> Share some basics about your place</h3>   
                <div className="basics">
                    <div className="basic">
                        <p>Guests</p>
                        <div className="basic_count">
                            <RemoveCircleOutline 
                            onClick={()=>{guestCount>1 && setGuestCount(guestCount-1)}}
                            sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:"#EF4444"},}}/>
                           <p>{guestCount}</p>
                           <AddCircleOutline
                            onClick={()=>{setGuestCount(guestCount+1)}}
                            sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:"#EF4444"},}}/>
                           
                        </div>
                    </div>

                    <div className="basic">
                        <p>Bedrooms</p>
                        <div className="basic_count">
                            <RemoveCircleOutline 
                            onClick={()=>{bedroomCount>1 && setBedroomCount(bedroomCount-1)}}
                            sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:"#EF4444"},}}/>
                           <p>{bedroomCount}</p>
                           <AddCircleOutline 
                            onClick={()=>{setBedroomCount(bedroomCount+1)}}
                           sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:"#EF4444"},}}/>
                           
                        </div>
                    </div>

                    <div className="basic">
                        <p>Beds</p>
                        <div className="basic_count">
                            <RemoveCircleOutline 
                                onClick={()=>{bedCount>1 && setBedCount(bedCount-1)}}
                            sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:"#EF4444"},}}/>
                           <p>{bedCount}</p>
                           <AddCircleOutline 
                            onClick={()=>{setBedCount(bedCount+1)}}
                            sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:"#EF4444"},}}/>
                        </div>
                    </div>

                    <div className="basic">
                        <p>Bathrooms</p>
                        <div className="basic_count">
                            <RemoveCircleOutline 
                                onClick={()=>{bathroomCount>1 && setBathroomCount(bathroomCount-1)}}
                            sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:"#EF4444"},}}/>
                           <p>{bathroomCount}</p>
                           <AddCircleOutline 
                            onClick={()=>{setBathroomCount(bathroomCount+1)}}
                           sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:"#EF4444"},}}/>
                        </div>
                    </div>
                </div>
            </div>


            {/* step 2 */}
            <div className="create-listing_step2">
               <h2>Step 2: Make your place stand out</h2>
               <hr/>
               <h3>Tell guests what yor pace has to offer</h3>
               
               <div className="amenities">
                 {facilities?.map((item,index)=>(
                    <div className={`facility ${amenities.includes(item.name) ? "selected":""}`} key={index} onClick={()=>handleSelectAmenities(item.name)}>
                      <div className="facility_icon">{item.icon}</div>
                      <p>{item.name}</p>
                    </div>
                 ))}
               </div>

            <h3>Add some photos of your place</h3>
                <DragDropContext onDragEnd={handleDragPhoto}>
                    <Droppable droppableId="photos" direction="horizontal">
                        {(provided) => (
                        <div
                            className="photos"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {photos.length < 1 && (
                            <>
                                <input
                                id="image"
                                type="file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleUploadPhotos}
                                multiple
                                />
                                <label htmlFor="image" className="alone">
                                <div className="icon">
                                    <IoIosImages/>
                                    
                                </div>
                                <p>Upload from your device</p>
                                </label>
                            </>
                            )}

                            {photos.length >= 1 && (
                            <>
                                {photos.map((photo, index) => {
                                return (
                                    <Draggable
                                    key={index}
                                    draggableId={index.toString()}
                                    index={index}
                                    >
                                    {(provided) => (
                                        <div
                                        className="photo"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="place"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePhoto(index)}
                                        >
                                            <BiTrash />
                                        </button>
                                        </div>
                                    )}
                                    </Draggable>
                                );
                                })}
                                <input
                                id="image"
                                type="file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleUploadPhotos}
                                multiple
                                />
                                <label htmlFor="image" className="together">
                                <div className="icon">
                                    <IoIosImages />
                                </div>
                                <p>Upload from your device</p>
                                </label>
                            </>
                            )}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>


            <h3>What make your place attractive and exciting?</h3>
                <div className="description">
                    <p>Title</p>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        required
                        onChange={handleChangeDescription}
                        value={formDescription.title}
                    />
                    <p>Description</p>
                    <textarea
                        type="text"
                        placeholder="Description"
                        name="description"
                        required
                        onChange={handleChangeDescription}
                        value={formDescription.description}
                    />
                    <p>Highlight</p>
                    <input
                        type="text"
                        placeholder="Highlight"
                        name="highlight"
                        required
                        onChange={handleChangeDescription}
                        value={formDescription.highlight}
                    />
                    <p>Highlight details</p>
                    <textarea
                        type="text"
                        placeholder="Highlight details"
                        name="highlightDesc"
                        required
                        onChange={handleChangeDescription}
                        value={formDescription.highlightDesc}
                    />
                    <p>Now, set your PRICE</p>
                    <span>₹</span>
                    <input
                        type="number"
                        placeholder="1000"
                        name="price"
                        className="price"
                        required
                        onChange={handleChangeDescription}
                        value={formDescription.price}
                    />
                </div>
          </div>
        <button className="submit_btn" type="submit">Create Listing</button>
        </form>



      </div>
      


    </>
  )
}

export default CreateListing