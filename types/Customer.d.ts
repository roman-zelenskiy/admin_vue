declare interface Customer {
  name: string;
  surname: string;
  aboutUser: string;
  ref: string;
  typeAccount: "Business account" | "Personal account";
  role?:
    | "Owner"
    | "Manager"
    | "Agent"
    | "Lead"
    | "Buyer"
    | "Seller"
    | "Coordinator"
    | "Integrator"
    | "Marketing"
    | "Receptionist"
    | "Team leader";

  category?: string;
  country: string;
  state: string;
  city: string;
  address: string;
  language: string;

  partners: number;
  listings: number;
  availableSlots?: number;
  customers?: number;
  leads?: number;
  buyers?: number;
  sellers?: number;
  followers?: number;
  photo?: string;
  phone: {
    type: string;
    number: string;
  }[];
  email: {
    type: string;
    page: string;
  }[];
  websiteSocial: {
    page: string;
    type: string;
  }[];

  experience: {
    logo: string;
    company: string;
    position: string;
    country?: string;
    city?: string;
    employmentType?:
      | "Full time"
      | "Part time"
      | "Self-employed"
      | "Freelancer"
      | "Intership";
    start: string;
    end: string;
    comment: string;
  }[];
  notificationDisplayProfile: boolean;
  notificationDisplayRealEstate: boolean;
  whoCanSendMePrivateMessage: boolean;
  notificationReceiveRequest: boolean;
  notificationBookingAViewing: boolean;
  notificationMakeAnOffer: boolean;
  receiveNotificationOfSharingLeadsFromOtherPartners: boolean;
  receiveNotificationOfNewAddedRealEstateByOtherPartners: boolean;
  notificationShowViewingData: boolean;
  verified: boolean;
  displayBlockCatalogue: "Countries" | "Type" | "Class" | "Market";
  displayComisionForPartners: VisibilityOptions;
  displayMyPartnersFor: VisibilityOptions;
  activateCommentsInMyPostsFor: VisibilityOptions;
  receiveInvitationToGroupBy: VisibilityOptions;
  receiveInvitationToEventsBy: VisibilityOptions;
  notificationPaymentByStatusInvoice: "Failed" | "Paid";
  alertUnreadedContacts: number;
  alertDeclinedBookingAViewing: number;
  notificationShowActivityOnTheMarketByTypeInDifferentCities: string;
  notificationShowPriceAnalysisByTypeInDifferentCities: string;
  notificationSubscriptionExpireDays: number;
  billingMethod: "E-Invoice" | "Paper invoice";
  billingFor: "Membership" | "Subscription" | "Per listing" | "Per lead";
  billingCountry: string;
  billingState: string;
  billingAddress: string;
  postalCode: string;
  methodOfPayment: "Bank account" | "Card";
  cyclePayment: "At the begging" | "At the end";
  company: string;
  subscriptions?: "Premium" | "Fremium";
}
