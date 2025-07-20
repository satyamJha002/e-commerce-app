import React from 'react'
import {Link} from "react-router-dom";

const CheckOut = () => {
    return (
        <div className="mt-20">
            <div className="bg-white p-4">
                <div className="md:max-w-5xl max-w-xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 max-md:order-1">
                            <h2 className="text-3xl font-semibold text-slate-900">Make a payment</h2>
                            <p className="text-slate-500 text-sm mt-4">Complete your transaction swiftly and securely
                                with our easy-to-use payment process.</p>
                            <div className="mt-8 max-w-lg">
                                <h3 className="text-lg font-semibold text-slate-900">Choose your payment method</h3>
                                <div className="flex flex-wrap gap-4 justify-between mt-6">
                                    <div className="flex items-center">
                                        <input type="radio" className="w-5 h-5 cursor-pointer" id="card" checked/>
                                        <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="https://readymadeui.com/images/visa.webp" className="w-12"
                                                 alt="card1"/>
                                            <img src="https://readymadeui.com/images/american-express.webp"
                                                 className="w-12" alt="card2"/>
                                            <img src="https://readymadeui.com/images/master.webp" className="w-12"
                                                 alt="card3"/>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal"/>
                                        <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="https://readymadeui.com/images/paypal.webp" className="w-20"
                                                 alt="paypalCard"/>
                                        </label>
                                    </div>
                                </div>

                                <form className="mt-12">
                                    <div className="grid gap-4">
                                        <div>
                                            <input type="text" placeholder="Cardholder's Name"
                                                   className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-200 rounded-md focus:border-purple-500 focus:bg-transparent outline-0"/>
                                        </div>
                                        <div
                                            className="flex bg-gray-100 border border-gray-200 rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-3"
                                                 viewBox="0 0 32 20">
                                                <circle cx="10" cy="10" r="10" fill="#f93232" data-original="#f93232"/>
                                                <path fill="#fed049"
                                                      d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                                                      className="hovered-path" data-original="#fed049"/>
                                            </svg>
                                            <input type="number" placeholder="Card Number"
                                                   className="px-4 py-3.5 text-slate-900 w-full text-sm outline-0 bg-transparent"/>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <input type="number" placeholder="EXP."
                                                       className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-200 rounded-md focus:border-purple-500 focus:bg-transparent outline-0"/>
                                            </div>
                                            <div>
                                                <input type="number" placeholder="CVV"
                                                       className="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-200 rounded-md focus:border-purple-500 focus:bg-transparent outline-0"/>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={'/orders-summary'}>
                                    <button type="button"
                                            className="mt-8 w-40 py-3 text-[15px] font-medium bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide cursor-pointer">Pay
                                    </button>
                                    </Link>
                                </form>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 rounded-md">
                            <h2 className="text-2xl font-semibold text-slate-900">$250.00</h2>
                            <ul className="text-slate-500 font-medium mt-8 space-y-4">
                                <li className="flex flex-wrap gap-4 text-sm">Split Sneakers <span
                                    className="ml-auto font-semibold text-slate-900">$150.00</span></li>
                                <li className="flex flex-wrap gap-4 text-sm">Echo Elegance <span
                                    className="ml-auto font-semibold text-slate-900">$90.00</span></li>
                                <li className="flex flex-wrap gap-4 text-sm">Tax <span
                                    className="ml-auto font-semibold text-slate-900">$10.00</span></li>
                                <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900 border-t border-gray-300 pt-4">Total <span
                                    className="ml-auto">$250.00</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut;
