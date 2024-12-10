import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { jsPDF } from "jspdf";
import Car1 from "../../assets/car-carousel1.png";
import Car2 from "../../assets/car-carousel2.png";
import Paint from "../../assets/paint.jpg";

// PDF generation and form submission
const Repaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    time: "",
    day: "",
    email: "",
    carType: "Benz", // Default car type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(20);
    doc.text("Appointment Details", 20, 20);

    doc.setFontSize(14);
    doc.text(`Name: ${formData.name}`, 20, 30);
    doc.text(`Location: ${formData.location}`, 20, 40);
    doc.text(`Time: ${formData.time}`, 20, 50);
    doc.text(`Day: ${formData.day}`, 20, 60);
    doc.text(`Email: ${formData.email}`, 20, 70);
    doc.text(`Car Type: ${formData.carType}`, 20, 80);

    // Save the PDF to a blob or a URL (optional: you can send this to a server or cloud storage)
    const pdfOutput = doc.output("bloburl");

    // Generate WhatsApp URL
    const whatsappLink = `https://api.whatsapp.com/send?phone=+2348124985138&text=Appointment%20Details%0A%0AName:%20${formData.name}%0ALocation:%20${formData.location}%0ATime:%20${formData.time}%0ADay:%20${formData.day}%0AEmail:%20${formData.email}%0ACar%20Type:%20${formData.carType}%0A%0APDF%20Link:%20${pdfOutput}`;

    // Open WhatsApp in a new tab with the generated details
    window.open(whatsappLink, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF(); // Generate PDF and open WhatsApp link
  };

  return (
    <div className="bg-[#1b1b1b] font-outfit w-full h-full">
      <div className="mx-auto xl:px-20 px-10 py-10">
        <div className=" ">
          <div className="flex xl:flex-row flex-col gap-20  container justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-white text-lg font-medium">
                FIND YOUR DREAM CAR COLOR AT KACHA AUTOS WORKSHOP
              </h1>
              <p className="text-[#7a7a7a] max-w-2xl mt-2 font-extralight text-sm font-outfit">
                At Kacha Autos, we specialize in transforming your vehicle with
                precision and style. Whether you're looking to refresh the look
                of your car with a vibrant new color or achieve a sleek, custom
                finish, our expert team is here to help. We offer a wide range
                of premium paints and finishes, designed to enhance the
                appearance and durability of your vehicle. Our workshop combines
                advanced technology with skilled craftsmanship to provide you
                with exceptional results that will make your car stand out on
                the road.
              </p>

              <div className="max-w-2xl">
                <img src={Paint} alt="" className="w-full rounded-md" />
              </div>
            </div>

            <div className="text-white py-6">
              <div className="bg-[#f5b754] text-center rounded-t-2xl xl:px-28 px-10 py-4">
                <div className="xl:text-xl text-lg font-bold text-[#000]">
                  Schedule An Appointment
                </div>
              </div>
              <div className="bg-[#222] text-[#999] rounded-b-2xl px-5 py-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 items-start">
                    <h1 className="text-base max-w-base">
                      Book your appointment with Kacha autos today and let us
                      take care of your vehicle with professionalism and
                      expertise.
                    </h1>

                    {/* Form Fields */}
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="name" className="text-sm mt-4">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="rounded-full bg-transparent border-[#C19D60] outline-none border-opacity-5 border p-4"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="location" className="text-sm mt-4">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="rounded-full bg-transparent border-[#C19D60] outline-none border-opacity-5 border p-4"
                        required
                      />
                    </div>

                    {/* Flex Layout for Time, Day, and Car Type */}
                    <div className="flex flex-wrap gap-4 w-full">
                      <div className="flex flex-col gap-2 w-full md:w-1/3">
                        <label htmlFor="time" className="text-sm">
                          Time
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="rounded-full bg-transparent border-[#C19D60] outline-none border-opacity-5 border p-4"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full md:w-1/3">
                        <label htmlFor="day" className="text-sm">
                          Day
                        </label>
                        <input
                          type="date"
                          id="day"
                          name="day"
                          value={formData.day}
                          onChange={handleChange}
                          className="rounded-full bg-transparent border-[#C19D60] outline-none border-opacity-5 border p-4"
                          required
                        />
                      </div>
                      <div className="flex flex-wrap gap-4 w-full">
                        <div className="flex flex-col gap-2 w-full md:w-1/3">
                          <label htmlFor="carType" className="text-sm">
                            Car Type
                          </label>
                          <select
                            name="carType"
                            value={formData.carType}
                            onChange={handleChange}
                            className="rounded-full bg-transparent border-[#C19D60] outline-none border-opacity-5 border p-4"
                          >
                            <option value="Benz">Benz</option>
                            <option value="Lexus">Lexus</option>
                            <option value="Honda">Honda</option>
                            <option value="Toyota">Toyota</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-1/3">
                          <label htmlFor="email" className="text-sm ">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-full bg-transparent border-[#C19D60] outline-none border-opacity-5 border p-4"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex mt-10 items-center gap-3 font-light md:px-6 md:py-4 px-4 py-2 text-base bg-[#f5b754] text-black rounded-full transition duration-300"
                    >
                      <FaWhatsapp color="#000" />
                      Book Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repaint;
