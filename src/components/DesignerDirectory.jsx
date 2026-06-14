// import React from "react";
// import "../styles/DesignerDirectory.css"
// import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn, FaStar, FaMapMarkerAlt } from "react-icons/fa";
// import { GoCheckCircleFill } from "react-icons/go";

// const DesignerDirectory = () => {
//   const designersData = [
//     { id: 1, 
//       name: "Rita .O. Johnson", 
//       specialty: "Bridal & Evening Wear", 
//       location: "Lagos, Nigeria", 
//       rating: "5.0 (327 reviews)", 
//       score: 86, 
//       img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
//     { id: 2, 
//       name: "Juliet .C. Ogidi", 
//       specialty: "Bridal & Evening Wear", 
//       location: "Lagos, Nigeria", 
//       rating: "5.0 (327 reviews)", 
//       score: 90, 
//       img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" 
//     },
//     { id: 3, 
//       name: "Steven Joseph", 
//       specialty: "Bridal & Evening Wear", 
//       location: "Lagos, Nigeria", 
//       rating: "5.0 (327 reviews)", 
//       score: 96, 
//       img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150" 
//     },
//     { id: 4, 
//       name: "Ekaette Okon", 
//       specialty: "Bridal & Evening Wear", 
//       location: "Lagos, Nigeria", 
//       rating: "5.0 (327 reviews)", 
//       score: 79, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
//     },
//     { id: 5, 
//       name: "Bridget Achafu",
//       specialty: "Bridal & Evening Wear", 
//       location: "Lagos, Nigeria", 
//       rating: "5.0 (327 reviews)", 
//       score: 88, 
//       img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150" 
//     },
//     { id: 6, 
//       name: "Keji A. Olawale", 
//       specialty: "Bridal & Evening Wear", 
//       location: "Lagos, Nigeria",       
//       rating: "5.0 (327 reviews)", 
//       score: 92, 
//       img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
//   ];

//   return (
//     <div className="directory-page-container">
//       <div className="directory-cards-grid">
//         {designersData.map((designer) => (
//           <div key={designer.id} className="designer-profile-card">
            
//             <div className="card-top-identity-row">
//               <img src={designer.img} alt={designer.name} className="designer-avatar-circle" />
//               <div className="verified-status-tag">
//                 <GoCheckCircleFill className="verified-check-icon" /> Verified
//               </div>
//             </div>
//             <div className="designer-bio-details">
//               <h3 className="designer-full-name">{designer.name}</h3>
//               <p className="designer-specialty-line">{designer.specialty}</p>
              
//               <div className="bio-meta-row location-row">
//                 <FaMapMarkerAlt className="meta-inline-icon" />
//                 <span>{designer.location}</span>
//               </div>
              
//               <div className="bio-meta-row ratings-row">
//                 <FaStar className="meta-inline-icon star-yellow" />
//                 <span>{designer.rating}</span>
//               </div>
//             </div>
//             <div className="reliability-score-block">
//               <div className="score-label-heading-row">
//                 <span className="metric-label-text">Reliability Score</span>
//                 <span className="metric-percentage-numeric">{designer.score}%</span>
//               </div>
//               <div className="reliability-progress-track">
//                 <div 
//                   className="reliability-progress-fill" 
//                   style={{ width: `${designer.score}%` }}
//                 ></div>
//               </div>
//               <span className="on-time-deliveries-caption">On-Time Deliveries</span>
//             </div>

//             <button className="view-profile- burgundy-btn">View Profile</button>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DesignerDirectory;