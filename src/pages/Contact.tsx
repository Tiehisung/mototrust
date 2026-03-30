// components/Contact.tsx
import { Button } from "@/components/buttons/Button";
import { Input, TextArea } from "@/components/input/Inputs";
import { SocialMediaHandles } from "@/components/SocialShare";
import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

 

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide uppercase text-sm">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 ">
            Join the Family
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-4 p-4 bg-secondary/30 rounded-xl">
              <div className="w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center shrink-0">
                <i className="fas fa-map-marker-alt text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg ">
                  Park Address
                </h3>
                <p className="text-muted-foreground">
                  Bunyeni Sports Complex, Main Road, Konjiehi, Wa Metro District
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-secondary/30 rounded-xl">
              <div className="w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center shrink-0">
                <i className="fas fa-envelope text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg ">Email Us</h3>
                <p className="text-muted-foreground">bunyenifc@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-secondary/30 rounded-xl">
              <div className="w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center shrink-0">
                <i className="fas fa-phone-alt text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg ">Call Us</h3>
                <p className="text-muted-foreground">
                  +233 55970 8485 | Office Hours: Mon-Fri 9AM-6PM
                </p>
              </div>
            </div>
            <SocialMediaHandles />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-5 py-3  "
              required
              name={"name"}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-5 py-3  "
              required
              name={"email"}
            />
            <TextArea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-5 py-3 resize-none"
              required
              name={"message"}
            />
            <Button
              type="submit"
              className="h-12 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg w-full"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
