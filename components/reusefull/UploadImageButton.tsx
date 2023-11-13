export default function UploadImageButton(
    {handleImageInput , text , classStyleLable , classStyleText}:{
        handleImageInput:(e:React.ChangeEvent<HTMLInputElement>)=>void;
        text:string;
        classStyleLable? : string ;
        classStyleText? : string ;
    }) {
  return (
    <div className=" relative inline-block w-full ">
    <input 
      name="trainer_img"
      onChange={handleImageInput}
      accept="image/*"
      type="file" 
      id="fileInput" 
      style={{display:'none'}} />
    <label htmlFor="fileInput" 
      className={classStyleLable || "px-[40vw] sm:px-[19vw] md:px-[16.5vw] lg:px-[14vw] z-10 max-w-[80vw] border border-white  p-[10px] rounded-sm cursor-pointer font-bold hover:bg-white/40"}></label>
    <p className={classStyleText || "text absolute inset-[50%]  translate-x-[-41%] w-[100px] top-0 -z-10 "}>{text}</p>
  </div>
  )
}
