import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
  HiOutlineUser,
} from "react-icons/hi2";
import { Input, Select, Textarea } from "@/components/form";
import { Button } from "@/components/buttons/Button";
import { ENV } from "@/lib/env";
import { useAppSelector } from "@/store/hooks/store";

// ============================================
// VALIDATION SCHEMA
// ============================================
const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phoneNumber: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(
      /^0[0-9]{9}$/,
      "Enter a valid Ghana phone number (e.g., 024XXXXXXX)",
    ),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ============================================
// CONSTANTS
// ============================================
const INQUIRY_OPTIONS = [
  { value: "", label: "Select inquiry type" },
  { value: "buying", label: "I want to buy a motorbike" },
  { value: "selling", label: "I want to sell my motorbike" },
  { value: "verification", label: "Identity verification help" },
  { value: "payment", label: "Payment issue" },
  { value: "listing", label: "Help with my listing" },
  { value: "partnership", label: "Partnership / Business inquiry" },
  { value: "other", label: "Other" },
];

// ============================================
// COMPONENT
// ============================================
export function ContactSection() {
  const { user } = useAppSelector((s) => s.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      email: "",
      inquiryType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log(data.message?.length);
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });

      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // CONTACT CARD STYLES
  // ============================================
  const contactCardClasses = `
    bg-muted/50 rounded-2xl p-5
    border border-border/50
    hover:border-border transition-colors duration-200
  `;

  const iconContainerClasses = `
    w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0
  `;

  return (
    <section className=" rounded-3xl p-6 md:p-10 max-w-4xl mx-auto border-border">
      {/* ============ HEADER ============ */}
      <div className="text-center mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <HiOutlineShieldCheck className="w-3.5 h-3.5" />
          Trusted Support
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Get in Touch
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
          Have questions about buying, selling, or verifying your identity? Our
          team in Wa is ready to help. We respond within 24 hours.
        </p>
      </div>

      {/* ============ GRID ============ */}
      <div className="grid md:grid-cols-5 gap-8 md:gap-10">
        {/* ============ LEFT - CONTACT INFO ============ */}
        <div className="md:col-span-2 space-y-4">
          {/* Office */}
          <div className={contactCardClasses}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Our Office
            </h3>
            <div className="flex items-start gap-3">
              <div className={iconContainerClasses}>
                <HiOutlineMapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Wa, Upper West Region
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Near Wa Central Market
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className={contactCardClasses}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Phone
            </h3>
            <div className="flex items-start gap-3">
              <div className={iconContainerClasses}>
                <HiOutlinePhone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <a
                  href={`tel:${ENV.CONTACT.PHONE}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  +233 XX XXX XXXX
                </a>
                <p className="text-xs text-muted-foreground mt-1">
                  Mon-Sat, 8AM-6PM
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className={contactCardClasses}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              WhatsApp
            </h3>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                <HiOutlineDevicePhoneMobile className="w-5 h-5 text-success" />
              </div>
              <div>
                <a
                  href={`https://wa.me/${ENV.CONTACT.PHONE || "233055952000x"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground hover:text-success transition-colors"
                >
                  Chat on WhatsApp
                </a>
                <p className="text-xs text-muted-foreground mt-1">
                  Fastest response
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className={contactCardClasses}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Email
            </h3>
            <div className="flex items-start gap-3">
              <div className={iconContainerClasses}>
                <HiOutlineEnvelope className="w-5 h-5 text-primary" />
              </div>
              <div>
                <a
                  href={`mailto:${ENV.CONTACT.EMAIL || "hello@motomartgh.com"}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {ENV.CONTACT.EMAIL || "hello@motomartgh.com"}
                </a>
                <p className="text-xs text-muted-foreground mt-1">
                  We reply within 24hrs
                </p>
              </div>
            </div>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <HiOutlineShieldCheck className="w-4 h-4 text-success" />
            <span>Your information is secure and private</span>
          </div>
        </div>

        {/* ============ RIGHT - FORM ============ */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <Input
              label="Full Name"
              required
              placeholder="e.g., Ibrahim Musah"
              icon={<HiOutlineUser className="w-5 h-5" />}
              error={errors.fullName?.message}
              {...register("fullName")}
            />

            {/* Phone Number */}
            <Input
              label="Phone Number"
              required
              type="tel"
              placeholder="e.g., 024XXXXXXX"
              icon={<HiOutlinePhone className="w-5 h-5" />}
              error={errors.phoneNumber?.message}
              {...register("phoneNumber")}
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder={`e.g., ${user?.fullName?.replaceAll(" ", "")?.toLowerCase() || "ibrahim"}@email.com`}
              icon={<HiOutlineEnvelope className="w-5 h-5" />}
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Inquiry Type */}
            <Controller
              control={control}
              name="inquiryType"
              render={({ field }) => (
                <Select
                  label="What do you need help with?"
                  required
                  options={INQUIRY_OPTIONS}
                  error={errors.inquiryType?.message}
                  {...field}
                />
              )}
            />

            {/* Message */}
            <Textarea
              label="Your Message"
              placeholder="Tell us more about what you need. If it's about a specific bike, include the brand and model..."
              error={errors.message?.message}
              rows={4}
              {...register("message")}
            />

            {/* Submit */}
            <Button
              type="submit"
              loading={isSubmitting}
              text={"Send Message"}
              loadingText="Sending..."
              size={"lg"}
              variant="default"
              className="rounded-xl h-12 w-full "
            >
              <HiOutlineEnvelope className="w-4 h-4" />
              
            </Button>

            {/* Footer note */}
            <p className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1.5">
              <HiOutlineShieldCheck className="w-3.5 h-3.5 text-success" />
              Secure communication • We respect your privacy
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
