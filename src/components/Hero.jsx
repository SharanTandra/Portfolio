import photo from "../assets/mee.png";
function Hero(){
    return(
        <>
        <div className="flex">
        <div>
            <img className="rounded-full m-10 h-80 w-160" src={photo} alt="error" />
        </div>
        <div className="text-3xl font-bold mt-30 ml-20">
            Hi, I'm Sharan Tandra.<br/>

            I'm a final-year B.Tech student at Sreyas Institute of Engineering and Technology with a strong interest in Full-Stack Development, Data Structures & Algorithms, and Software Engineering. 

            I enjoy building web applications using React, Flask, MySQL, and MongoDB. I'm continuously improving my problem-solving skills through LeetCode and hands-on projects.
        </div>
        </div>
        </>
    )
}
export default Hero