// const handleHubtelPayment = async () => {
//     try {
//         const result = await initiateHubtelPayment({
//             listingId,
//             momoNumber: userPhone,
//             network: 'MTN',
//         }).unwrap();

//         toast.success('Check your phone', {
//             description: 'Enter your MoMo PIN to complete payment',
//         });

//         // Poll for status
//         pollPaymentStatus(result.data.paymentId);
//     } catch (err) {
//         toast.error('Payment failed');
//     }
// };

// const handlePaystackRedirect = async () => {
//     try {
//         const result = await initiatePaystackRedirect({
//             listingId,
//         }).unwrap();

//         // Redirect to Paystack checkout page
//         window.location.href = result.data.authorizationUrl;
//     } catch (err) {
//         toast.error('Payment failed');
//     }
// };

// const handlePaystackDirect = async () => {
//     try {
//         const result = await initiatePaystackDirect({
//             listingId,
//             momoNumber: userPhone,
//             network: 'MTN',
//         }).unwrap();

//         toast.success('Check your phone', {
//             description: 'Enter your MoMo PIN to complete payment',
//         });

//         pollPaymentStatus(result.data.reference);
//     } catch (err) {
//         toast.error('Payment failed');
//     }
// };

// // Polling helper
// const pollPaymentStatus = (reference: string) => {
//     const interval = setInterval(async () => {
//         const result = await verifyPayment(reference).unwrap();
//         if (result.data.verified) {
//             clearInterval(interval);
//             toast.success('Payment confirmed!');
//             // Refresh page or update UI
//         }
//     }, 3000);

//     // Stop after 2 minutes
//     setTimeout(() => clearInterval(interval), 120000);
// };