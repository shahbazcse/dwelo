import React from 'react'

import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="py-12 bg-[#f7f7f7] border-t border-[#dddddd] text-sm text-[#222222] w-full z-[20]">
            <section className=" grid grid-cols-2 md:grid-cols-4 gap-8 justify-between max-w-screen-2xl mx-auto px-10">
                <div className="flex flex-col gap-4 opacity-80">
                    <h6 className="font-semibold">Support</h6>
                    <p>Help Center</p>
                    <p>Get help with a safety issue</p>
                    <p>DweloCover</p>
                    <p>Supporting people with disabilities</p>
                    <p>Cancelation options</p>
                    <p>Our Covid-19 response</p>
                    <p>Report a neighborhood concern</p>
                </div>
                <div className="flex flex-col gap-4 opacity-80">
                    <h6 className="font-semibold">Community</h6>
                    <p>Dwelo.org: Disaster relief housing</p>
                    <p>Combating discrimination</p>
                </div>
                <div className="flex flex-col gap-4 opacity-80">
                    <h6 className="font-semibold">Hosting</h6>
                    <p>Dwelo Home</p>
                    <p>DweloCover for Hosts</p>
                    <p>Explore hosting resources</p>
                    <p>Visit our community forum</p>
                    <p>How to host responsibly</p>
                    <p>Dwelo friendly apartments</p>
                </div>
                <div className="flex flex-col gap-4 opacity-80">
                    <h6 className="font-semibold">Dwelo</h6>
                    <p>Newsroom</p>
                    <p>DweloCover for Hosts</p>
                    <p>Explore hosting resources</p>
                    <p>Visit our community forum</p>
                    <p>How to host responsibly</p>
                    <p>Dwelo friendly apartments</p>
                </div>
            </section>
            <hr className="bg-[#f7f7f7] mt-10 mb-6" />
            <section className=" flex flex-row flex-wrap justify-between gap-10 px-10 max-w-screen-2xl mx-auto">
                <div className=" flex flex-row flex-wrap items-center">
                    <p className='font-[roboto]'>© 2024 Dwelo, Inc.</p>
                    <span className=" p-3">·</span>
                    <p>Terms</p>
                    <span className=" p-3">·</span>
                    <p>Privacy</p>
                    <span className=" p-3">·</span>
                    <p>Your Privacy Choices</p>
                </div>
                <div className=" flex flex-row gap-5 min-w-[120px] items-center">
                    <p>English (US)</p>
                    <FaFacebookSquare className='h-6 w-6 text-blue-600' />
                    <FaLinkedin className='h-6 w-6 text-blue-700' />
                </div>
            </section>
        </footer>
    )
}

export default Footer