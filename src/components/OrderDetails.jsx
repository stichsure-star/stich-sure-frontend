// import React from 'react';
// import { LogOut, User, ShoppingBag, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';
// import { FaEye, FaLock, FaEnvelope, FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa'; 
// import '../../src/styles/OrderDetails.css';

// const OrderDetails = () => {
//     const currentPrice = 300000;
//     const priceFormatted = currentPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
//     const overallProgress = 60; 

//     return (
//         <div className="orders-wrapper">
//             <header className="orders-navbar">
//                 <div className="navbar-content">
//                     <div className="brand-identifier">
//                         <ShoppingBag size={22} className="brand-icon" /> 
//                         <h2>STISCHURE</h2>
//                     </div>
//                     <nav className="navbar-actions">
//                         <a href="/dashboard"><User size={18} /> My Dashboard</a>
//                         <a href="/profile"><FaEye size={18} /> View Profile</a>
//                         <button className="auth-action-btn"><LogOut size={18} /> Logout</button>
//                     </nav>
//                 </div>
//             </header>

//             <main className="orders-container">
//                 <div className="orders-content-layout">
//                     <aside className="security-module">
//                         <div className="security-card-header">
//                             <ShieldCheck size={20} className="header-icon" />
//                             <h3>Update Password</h3>
//                         </div>
                        
//                         <div className="security-card-body">
//                             <p className="security-info">
//                                 For security reasons, please update your password regularly. It must be at least 8 characters long.
//                             </p>
                            
//                             <form className="password-form">
//                                 <div className="input-with-icon">
//                                     <FaLock className="input-icon" />
//                                     <input type="password" placeholder="Current Password" />
//                                 </div>
//                                 <div className="input-with-icon">
//                                     <FaLock className="input-icon" />
//                                     <input type="password" placeholder="New Password" />
//                                 </div>
//                                 <div className="input-with-icon">
//                                     <FaEnvelope className="input-icon" />
//                                     <input type="email" placeholder="Verification Email" />
//                                 </div>
//                                 <button type="submit" className="action-button update-btn">Change Password</button>
//                             </form>
//                         </div>
//                     </aside>

//                     <section className="order-details-module">
//                         <div className="tracking-summary">
//                             <div className="summary-left">
//                                 <h1>Coperate Suit</h1>
//                                 <p className="client-id">for Faith E.</p>
//                                 <p className="transaction-id">Transaction ID: TRN-101</p>
//                             </div>
//                             <div className="summary-right">
//                                 <div className="price-tag">{priceFormatted}</div>
//                                 <div className="status-label in-progress">Ready</div>
//                                 <p className="delivery-date">Due: June 04, 2026</p>
//                             </div>
//                         </div>

//                         <div className="tracking-timeline">
//                             <div className="timeline-block confirmed">
//                                 <div className="block-content">
//                                     <div className="status-icon"><Lock size={16} color="#fff" /></div>
//                                     <div className="block-info">
//                                         <p className="info-main">Picked Up</p>
//                                         <p className="info-sub">Completed: May 15, 2026</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="timeline-block ready active">
//                                 <div className="block-content">
//                                     <div className="status-icon">
//                                         <span className="dot-icon"></span>
//                                     </div>
//                                     <div className="block-info">
//                                         <p className="info-main">Ready</p>
//                                     </div>
//                                 </div>
//                                 <button className="action-button cta-btn">View My Dashboard</button>
//                             </div>

//                             <div className="timeline-block complete inactive">
//                                 <div className="block-content">
//                                     <div className="status-icon"><CheckCircle2 size={22} color="#888" /></div>
//                                     <div className="block-info">
//                                         <p className="info-main">Delivered</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="progress-container">
//                             <div className="progress-bar-header">
//                                 <p>Overall Progress</p>
//                                 <p className="progress-percentage">{overallProgress}%</p>
//                             </div>
//                             <div className="progress-bar-track">
//                                 <div className="progress-bar-fill" style={{ width: `${overallProgress}%` }}></div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </main>
//             <footer className="page-footer">
//                 <div className="footer-content-inner">
//                     <p>&copy; 2026 Stichsure. All rights reserved.</p>
//                     <div className="footer-icons">
//                         <a href="#instagram"><FaInstagram size={18} /></a>
//                         <a href="#linkedin"><FaLinkedin size={18} /></a>
//                         <a href="#facebook"><FaFacebook size={18} /></a>
//                         <a href="#twitter"><FaTwitter size={18} /></a>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default OrderDetails;