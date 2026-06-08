import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetListingQuery, useContactSellerMutation } from '@/services/listingsApi';
 
import { toast } from 'sonner';
import {
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineCalendarDays,
  HiOutlineEye,
  HiOutlinePhone,
  HiOutlineArrowLeft,
  HiOutlineShare,
  HiOutlineExclamationTriangle,
  HiOutlineCheckBadge,
 
  HiOutlineDocumentText,
} from 'react-icons/hi2';
import { useAppSelector } from '@/store/hooks/store';
import { FaMotorcycle } from 'react-icons/fa6';

const ListingDetailPage = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetListingQuery(listingId!);
  const [contactSeller, { isLoading: isContacting }] = useContactSellerMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [showContact, setShowContact] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [safetyAcknowledged, setSafetyAcknowledged] = useState(false);

  const listing = data?.data;

  const handleContact = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in', { description: 'You need an account to contact sellers' });
      navigate('/auth/signin', { state: { from: { pathname: `/listing/${listingId}` } } });
      return;
    }

    if (!safetyAcknowledged) {
      setShowSafetyModal(true);
      return;
    }

    try {
      const result = await contactSeller(listingId!).unwrap();

      console.log(result)
      setShowContact(true);
      toast.success('Contact details retrieved', {
        description: 'Remember: never pay before seeing the bike in person.',
      });
    } catch (err: any) {
      toast.error('Failed to get contact', {
        description: err?.data?.message || 'Please try again',
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${listing?.brand} ${listing?.model} - GHS ${listing?.price?.toLocaleString()}`,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="aspect-video _shimmer rounded-3xl" />
        <div className="space-y-3">
          <div className="h-8 w-2/3 _shimmer rounded-lg" />
          <div className="h-6 w-1/3 _shimmer rounded-lg" />
          <div className="h-4 w-full _shimmer rounded-lg" />
          <div className="h-4 w-3/4 _shimmer rounded-lg" />
        </div>
      </div>
    );
  }

  if (isError || !listing) {
    return (
      <div className="text-center py-20">
        <HiOutlineExclamationTriangle className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-surface-foreground">Listing not found</h2>
        <p className="text-muted-foreground mt-1">This listing may have been removed</p>
        <Link
          to="/browse"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand text-brand-foreground rounded-xl text-sm font-medium"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Browse listings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-surface-foreground transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Image Gallery */}
      <div className="space-y-3">
        <div className="aspect-video md:aspect-2/1 bg-surface-muted rounded-3xl overflow-hidden relative">
          {listing?.images?.[selectedImage] ? (
            <img
              src={listing?.images[selectedImage]}
              alt={`${listing?.brand} ${listing?.model}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaMotorcycle className="w-20 h-20 text-muted-foreground/30" />
            </div>
          )}
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {listing?.listingType === 'premium' && (
              <span className="_badge _badgeFeatured text-sm px-3 py-1">Featured</span>
            )}
            {listing?.isPhysicallyVerified && (
              <span className="_badge _badgeVerified text-sm px-3 py-1">
                <HiOutlineShieldCheck className="w-4 h-4" />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        {listing?.images?.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {listing?.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all
                  ${idx === selectedImage ? 'border-brand' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Price */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-foreground">
              {listing?.brand} {listing?.model} {listing?.year && `(${listing?.year})`}
            </h1>
            <div className="mt-2 text-3xl font-bold text-brand">
              GHS {listing?.price.toLocaleString()}
            </div>
            {listing?.priceNegotiable && (
              <span className="text-sm text-muted-foreground">Price is negotiable</span>
            )}
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Condition', value: listing?.condition, icon: HiOutlineCheckBadge },
              { label: 'Location', value: listing?.location, icon: HiOutlineMapPin },
              { label: 'Year', value: listing?.year || 'N/A', icon: HiOutlineCalendarDays },
              { label: 'Mileage', value: listing?.mileage ? `${listing?.mileage.toLocaleString()} km` : 'N/A', icon: FaMotorcycle },
              { label: 'Engine', value: listing?.engineCapacity ? `${listing?.engineCapacity}cc` : 'N/A', icon: FaMotorcycle },
              { label: 'Views', value: listing?.viewCount, icon: HiOutlineEye },
            ].map((spec) => (
              <div key={spec.label} className="bg-surface-muted rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <spec.icon className="w-3.5 h-3.5" />
                  {spec.label}
                </div>
                <div className="text-sm font-semibold text-surface-foreground capitalize">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          {listing?.description && (
            <div>
              <h3 className="text-lg font-semibold text-surface-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{listing?.description}</p>
            </div>
          )}

          {/* Reason for selling */}
          {listing?.reasonForSelling && (
            <div className="bg-surface-muted rounded-2xl p-4">
              <h4 className="text-sm font-medium text-surface-foreground mb-1">Why selling</h4>
              <p className="text-sm text-muted-foreground">{listing?.reasonForSelling}</p>
            </div>
          )}

          {/* Documents */}
          {listing?.hasDocuments && (
            <div>
              <h3 className="text-lg font-semibold text-surface-foreground mb-2">Documents</h3>
              <div className="flex items-center gap-3 bg-surface-muted rounded-xl p-3">
                <HiOutlineDocumentText className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm font-medium text-surface-foreground">
                    {listing?.documentType as string ?? 'Documents available'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Original documents available with the bike
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right - Seller Card */}
        <div className="space-y-4">
          <div className="bg-surface-elevated border border-border rounded-2xl p-5 sticky top-20">
            {/* Seller info */}
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Seller</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-muted rounded-full flex items-center justify-center text-brand font-bold text-lg">
                {listing?.seller && typeof listing?.seller === 'object' 
                  ? listing?.seller.fullName.charAt(0).toUpperCase() 
                  : '?'}
              </div>
              <div>
                <p className="font-semibold text-surface-foreground text-sm">
                  {listing?.seller && typeof listing?.seller === 'object' 
                    ? listing?.seller.fullName 
                    : 'Seller'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {listing?.seller && typeof listing?.seller === 'object' && listing?.seller.town 
                    ? listing?.seller.town 
                    : listing?.location}
                </p>
              </div>
            </div>

            {listing?.seller && typeof listing?.seller === 'object' && listing?.seller.isVerified && (
              <div className="flex items-center gap-2 text-xs text-success bg-success/5 rounded-lg px-3 py-2 mb-4">
                <HiOutlineShieldCheck className="w-4 h-4" />
                Verified seller
              </div>
            )}

            {/* Contact buttons */}
            {!showContact ? (
              <button
                onClick={handleContact}
                disabled={isContacting}
                className="w-full py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
                  hover:opacity-90 active:scale-[0.98] transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
              >
                <HiOutlinePhone className="w-4 h-4" />
                {isContacting ? 'Loading...' : 'Contact Seller'}
              </button>
            ) : (
              <div className="space-y-2">
                <a
                  href={`tel:${listing?.seller && typeof listing?.seller === 'object' ? listing?.seller.phoneNumber : ''}`}
                  className="w-full py-2.5 bg-success text-success-foreground rounded-xl text-sm font-medium
                    flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <HiOutlinePhone className="w-4 h-4" />
                  Call Seller
                </a>
                <p className="text-xs text-center text-muted-foreground">
                  {listing?.seller && typeof listing?.seller === 'object' 
                    ? listing?.seller.phoneNumber 
                    : ''}
                </p>
              </div>
            )}

            {/* Share */}
            <button
              onClick={handleShare}
              className="w-full mt-3 py-2.5 bg-surface-muted text-surface-foreground rounded-xl text-sm font-medium
                flex items-center justify-center gap-2 hover:bg-surface-elevated border border-border transition-colors"
            >
              <HiOutlineShare className="w-4 h-4" />
              Share listing
            </button>

            {/* Safety tip */}
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-amber-50 dark:bg-amber-950/20 rounded-xl p-3">
              <HiOutlineExclamationTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p>
                Never pay via MoMo before seeing the bike in person and verifying documents.
                Meet in a safe, public place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Modal */}
      {showSafetyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-elevated rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/30 rounded-full flex items-center justify-center mx-auto">
              <HiOutlineShieldCheck className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-surface-foreground text-center">
              Safety First
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Never send money via MoMo before seeing the bike</p>
              <p>• Meet in a public place during daytime</p>
              <p>• Verify all documents before payment</p>
              <p>• Bring a friend or mechanic if possible</p>
              <p>• Trust your instincts - if it seems too good, it probably is</p>
            </div>
            <button
              onClick={() => {
                setSafetyAcknowledged(true);
                setShowSafetyModal(false);
                handleContact();
              }}
              className="w-full py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium"
            >
              I understand, show contact
            </button>
            <button
              onClick={() => setShowSafetyModal(false)}
              className="w-full py-2 text-sm text-muted-foreground hover:text-surface-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetailPage;