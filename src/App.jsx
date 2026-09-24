import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Star,
  Menu,
  X,
  Home,
  Compass,
  Tag,
  Calendar,
  HelpCircle,
  User,
  ChevronRight,
  Heart,
  Share2,
  Clock,
  CreditCard,
  ArrowLeft,
  CheckCircle,
  Building2,
  UtensilsCrossed,
  Film,
  Mic2,
  Sparkles,
  Bike,
  Settings,
  LogOut,
  Bell,
  SlidersHorizontal,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// MOCK DATA — KENYA NATIVE (English names) with real images
// ---------------------------------------------------------------------------
const MOCK_SERVICES = [
  {
    id: 1,
    name: 'Serena Hotel Nairobi',
    category: 'Hotels',
    rating: 4.8,
    reviews: 1240,
    price: 18500,
    location: 'Nairobi CBD',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    description: 'Five-star luxury in the heart of the city',
  },
  {
    id: 2,
    name: 'Diani Beach Resort',
    category: 'Hotels',
    rating: 4.6,
    reviews: 890,
    price: 24000,
    location: 'Diani, Kwale',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80',
    description: 'Beachfront paradise on the South Coast',
  },
  {
    id: 3,
    name: 'Mama Oliech Restaurant',
    category: 'Restaurants',
    rating: 4.9,
    reviews: 2100,
    price: 2500,
    location: 'Westlands, Nairobi',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    description: 'Authentic nyama choma & ugali experience',
  },
  {
    id: 4,
    name: 'Mama Ngina Fish Palace',
    category: 'Restaurants',
    rating: 4.5,
    reviews: 1560,
    price: 1800,
    location: 'Kisumu',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
    description: 'Fresh tilapia from Lake Victoria since 1985',
  },
  {
    id: 5,
    name: 'Century Cinemax',
    category: 'Movies',
    rating: 4.7,
    reviews: 3200,
    price: 700,
    location: 'The Hub, Karen',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
    description: 'IMAX laser projection & recliner seats',
  },
  {
    id: 6,
    name: 'Churchill Show Live',
    category: 'Events',
    rating: 4.4,
    reviews: 780,
    price: 1500,
    location: 'Kenya National Theatre',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&q=80',
    description: "Kenya's biggest comedy show every Thursday",
  },
  {
    id: 7,
    name: 'Maisha Spa & Wellness',
    category: 'Wellness',
    rating: 4.9,
    reviews: 950,
    price: 5500,
    location: 'Kilimani, Nairobi',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    description: 'Full body massage & aromatherapy',
  },
  {
    id: 8,
    name: 'Mount Kenya Safari Lodge',
    category: 'Hotels',
    rating: 4.7,
    reviews: 670,
    price: 32000,
    location: 'Nanyuki',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
    description: 'Cozy lodge with views of Mount Kenya',
  },
  {
    id: 9,
    name: 'Burger King Kenya',
    category: 'Restaurants',
    rating: 4.3,
    reviews: 1890,
    price: 1200,
    location: 'Sarit Centre, Nairobi',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    description: 'Flame-grilled burgers & local brews',
  },
  {
    id: 10,
    name: 'Sarafina Theatre: The Lion King',
    category: 'Events',
    rating: 4.9,
    reviews: 4500,
    price: 3500,
    location: 'Nairobi Cinema',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80',
    description: 'Award-winning Kenyan musical',
  },
  {
    id: 11,
    name: 'Maasai Mara Bike Tours',
    category: 'Activities',
    rating: 4.6,
    reviews: 540,
    price: 8000,
    location: 'Maasai Mara',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80',
    description: 'Guided bike tour through the savannah',
  },
  {
    id: 12,
    name: 'Koroga Festival',
    category: 'Events',
    rating: 4.8,
    reviews: 2300,
    price: 2500,
    location: 'Ngong Racecourse, Nairobi',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
    description: 'Live Afrobeat & genge music under the stars',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Compass },
  { id: 'Hotels', label: 'Hotels', icon: Building2 },
  { id: 'Restaurants', label: 'Restaurants', icon: UtensilsCrossed },
  { id: 'Movies', label: 'Movies', icon: Film },
  { id: 'Events', label: 'Events', icon: Mic2 },
  { id: 'Wellness', label: 'Wellness', icon: Sparkles },
  { id: 'Activities', label: 'Activities', icon: Bike },
];

const NAV_LINKS = [
  { id: 'explore', label: 'Explore', icon: Home },
  { id: 'deals', label: 'Deals', icon: Tag },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

const MOCK_BOOKINGS = [
  { id: 101, service: 'Serena Hotel Nairobi', date: '2026-10-15', status: 'Confirmed', price: 18500 },
  { id: 102, service: 'Churchill Show Live', date: '2026-10-22', status: 'Pending', price: 1500 },
  { id: 103, service: 'Maisha Spa & Wellness', date: '2026-11-02', status: 'Confirmed', price: 5500 },
];

const MOCK_DEALS = [
  { id: 201, title: 'Weekend Getaway', discount: '25% OFF', description: 'On all hotels in Diani & Mombasa', code: 'COAST25' },
  { id: 202, title: 'Nyama Choma Night', discount: 'KES 500 OFF', description: 'At selected restaurants every Friday', code: 'GRILL500' },
  { id: 203, title: 'Movie Marathon', discount: 'Buy 1 Get 1', description: 'On Tuesday screenings at Century Cinemax', code: 'BOGO' },
];

const MOCK_HELP = [
  { id: 301, question: 'How do I cancel a booking?', answer: 'Go to My Bookings, select the booking, and tap Cancel. Refunds are processed within 3-5 business days.' },
  { id: 302, question: 'What payment methods do you accept?', answer: 'We accept M-Pesa, Airtel Money, Visa, Mastercard, and bank transfers.' },
  { id: 303, question: 'Can I modify a booking?', answer: 'Yes, most bookings can be modified up to 24 hours before the scheduled time.' },
];

// ---------------------------------------------------------------------------
// STYLES
// ---------------------------------------------------------------------------
const colors = {
  primary: '#1e3a8a',
  primaryHover: '#1e40af',
  primaryLight: '#3b82f6',
  primaryTint: '#eff6ff',
  white: '#ffffff',
  offWhite: '#f8fafc',
  gray: '#64748b',
  lightGray: '#e2e8f0',
  dark: '#0f172a',
  accent: '#f59e0b',
  success: '#10b981',
};

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

const StarRating = ({ rating, reviews }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <Star size={13} fill={colors.accent} color={colors.accent} />
    <span style={{ fontWeight: '600', fontSize: '13px', color: colors.dark }}>{rating}</span>
    <span style={{ color: colors.gray, fontSize: '11px' }}>({reviews})</span>
  </div>
);

const ServiceCard = ({ service, onBook, onViewDetails }) => (
  <div
    onClick={() => onViewDetails(service)}
    style={{
      backgroundColor: colors.white,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      borderTop: `4px solid ${colors.primary}`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 20px -8px rgba(30,58,138,0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
    }}
  >
    <div
      style={{
        height: '180px',
        backgroundColor: colors.offWhite,
        overflow: 'hidden',
        position: 'relative',
        borderBottom: `1px solid ${colors.lightGray}`,
      }}
    >
      <img
        src={service.image}
        alt={service.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <button
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Heart size={18} color={colors.primary} />
      </button>
    </div>

    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            color: colors.primary,
            backgroundColor: colors.primaryTint,
            padding: '4px 10px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
          }}
        >
          {service.category}
        </span>
        <StarRating rating={service.rating} reviews={service.reviews} />
      </div>

      <h3 style={{ margin: '12px 0 4px', fontSize: '16px', fontWeight: '700', color: colors.dark, lineHeight: 1.3 }}>
        {service.name}
      </h3>
      <p style={{ margin: '0 0 8px', fontSize: '13px', color: colors.gray, flex: 1, lineHeight: 1.5 }}>
        {service.description}
      </p>
      <p style={{ margin: '0 0 16px', fontSize: '12px', color: colors.gray, display: 'flex', alignItems: 'center', gap: '4px' }}>
        <MapPin size={13} /> {service.location}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', gap: '8px' }}>
        <div>
          <div style={{ fontSize: '17px', fontWeight: '800', color: colors.primary }}>
            KES {service.price.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: colors.gray }}>per person</div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBook(service);
          }}
          style={{
            backgroundColor: colors.primary,
            color: colors.white,
            border: 'none',
            borderRadius: '10px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// PAGE COMPONENTS
// ---------------------------------------------------------------------------

const ExplorePage = ({ services, onBook, onViewDetails, selectedCategory, setSelectedCategory }) => (
  <>
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: colors.dark, margin: 0 }}>
          Browse
        </h2>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: colors.white,
            border: `1px solid ${colors.lightGray}`,
            borderRadius: '10px',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: '600',
            color: colors.gray,
            cursor: 'pointer',
          }}
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
      </div>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '30px',
                border: isActive ? 'none' : `1.5px solid ${colors.lightGray}`,
                backgroundColor: isActive ? colors.primary : colors.white,
                color: isActive ? colors.white : colors.gray,
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <Icon size={14} />
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>

    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 16px 100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: colors.dark, margin: 0 }}>
          {selectedCategory === 'all' ? 'All experiences' : selectedCategory}
          <span style={{ fontSize: '14px', fontWeight: '500', color: colors.gray, marginLeft: '8px' }}>
            ({services.length})
          </span>
        </h2>
      </div>

      {services.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: colors.white,
            borderRadius: '16px',
            border: `1px solid ${colors.lightGray}`,
          }}
        >
          <Search size={40} color={colors.gray} style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '17px', fontWeight: '700', color: colors.dark, margin: '0 0 6px' }}>
            No results found
          </h3>
          <p style={{ color: colors.gray, margin: 0, fontSize: '14px' }}>
            Try adjusting your search or filter.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onBook={onBook} onViewDetails={onViewDetails} />
          ))}
        </div>
      )}
    </main>
  </>
);

const DealsPage = ({ onApplyDeal }) => (
  <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px 100px' }}>
    <h1 style={{ fontSize: '26px', fontWeight: '800', color: colors.dark, margin: '0 0 6px' }}>Deals & Offers</h1>
    <p style={{ fontSize: '14px', color: colors.gray, margin: '0 0 24px' }}>Save big on your next booking.</p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
      {MOCK_DEALS.map((deal) => (
        <div
          key={deal.id}
          style={{
            backgroundColor: colors.white,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
            borderLeft: `5px solid ${colors.primary}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: colors.dark, margin: 0 }}>{deal.title}</h3>
            <span style={{ backgroundColor: colors.primaryTint, color: colors.primary, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>{deal.discount}</span>
          </div>
          <p style={{ fontSize: '13px', color: colors.gray, margin: '0 0 16px', lineHeight: 1.5 }}>{deal.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: colors.gray }}>Code: <strong style={{ color: colors.primary }}>{deal.code}</strong></span>
            <button
              onClick={() => onApplyDeal(deal)}
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '10px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Apply <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </main>
);

const BookingsPage = ({ onCancelBooking }) => (
  <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px 100px' }}>
    <h1 style={{ fontSize: '26px', fontWeight: '800', color: colors.dark, margin: '0 0 6px' }}>My Bookings</h1>
    <p style={{ fontSize: '14px', color: colors.gray, margin: '0 0 24px' }}>Manage your bookings.</p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {MOCK_BOOKINGS.map((booking) => (
        <div
          key={booking.id}
          style={{
            backgroundColor: colors.white,
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Calendar size={20} color={colors.primary} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: colors.dark, margin: '0 0 6px', lineHeight: 1.3 }}>{booking.service}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: colors.gray }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {booking.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CreditCard size={12} /> KES {booking.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
            <span
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: booking.status === 'Confirmed' ? '#ecfdf5' : '#fef3c7',
                color: booking.status === 'Confirmed' ? colors.success : '#b45309',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              {booking.status === 'Confirmed' ? <CheckCircle size={12} /> : <Clock size={12} />}
              {booking.status}
            </span>
            <button
              onClick={() => onCancelBooking(booking)}
              style={{
                backgroundColor: 'transparent',
                color: '#dc2626',
                border: '1.5px solid #dc2626',
                borderRadius: '10px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  </main>
);

const HelpPage = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px 100px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '800', color: colors.dark, margin: '0 0 6px' }}>Help Center</h1>
      <p style={{ fontSize: '14px', color: colors.gray, margin: '0 0 24px' }}>Find answers to common questions.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {MOCK_HELP.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: colors.dark,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ flex: 1 }}>{item.question}</span>
              <ChevronRight
                size={18}
                color={colors.primary}
                style={{ transform: openId === item.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
              />
            </button>
            {openId === item.id && (
              <div style={{ padding: '0 16px 16px', fontSize: '14px', color: colors.gray, lineHeight: 1.6 }}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

const ServiceDetailPage = ({ service, onBack, onBook }) => (
  <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px 16px 100px' }}>
    <button
      onClick={onBack}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: 'transparent',
        border: 'none',
        color: colors.primary,
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        marginBottom: '16px',
        padding: 0,
      }}
    >
      <ArrowLeft size={18} /> Back
    </button>

    <div style={{ backgroundColor: colors.white, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      <div style={{ height: '240px', overflow: 'hidden' }}>
        <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: colors.primary, backgroundColor: colors.primaryTint, padding: '4px 12px', borderRadius: '20px' }}>
            {service.category}
          </span>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: colors.dark, margin: '10px 0 8px', lineHeight: 1.2 }}>{service.name}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ fontSize: '13px', color: colors.gray, display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
              <MapPin size={14} /> {service.location}
            </p>
            <StarRating rating={service.rating} reviews={service.reviews} />
          </div>
        </div>

        <div style={{ backgroundColor: colors.primaryTint, borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: colors.primary }}>
            KES {service.price.toLocaleString()}
            <span style={{ fontSize: '13px', fontWeight: '500', color: colors.gray }}> / person</span>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: colors.gray, lineHeight: 1.7, marginBottom: '20px' }}>{service.description}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => onBook(service)}
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Book Now
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{
                backgroundColor: colors.white,
                color: colors.primary,
                border: `1.5px solid ${colors.primary}`,
                borderRadius: '12px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                flex: 1,
              }}
            >
              <Heart size={16} /> Save
            </button>
            <button
              style={{
                backgroundColor: colors.white,
                color: colors.primary,
                border: `1.5px solid ${colors.primary}`,
                borderRadius: '12px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                flex: 1,
              }}
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
);

// ---------------------------------------------------------------------------
// MAIN APP COMPONENT
// ---------------------------------------------------------------------------
const App = () => {
  const [currentPage, setCurrentPage] = useState('explore');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const filteredServices = useMemo(() => {
    return MOCK_SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleBook = (service) => {
    showToast(` Booking confirmed for "${service.name}"!`);
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    setSelectedService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyDeal = (deal) => showToast(`Deal "${deal.code}" applied!`);
  const handleCancelBooking = (booking) => showToast(` Booking for "${booking.service}" cancelled.`);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", backgroundColor: colors.offWhite, minHeight: '100vh' }}>
      {/* NAVBAR */}
      <nav
        style={{
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.lightGray}`,
          padding: '0 16px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavigate('explore')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '800',
              }}
            >
              B
            </div>
            <span style={{ fontSize: '17px', fontWeight: '800', color: colors.primary, letterSpacing: '-0.3px' }}>
              Book<span style={{ color: colors.dark }}>Everything</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: isActive ? colors.primaryTint : 'transparent',
                    color: isActive ? colors.primary : colors.gray,
                    fontSize: '14px',
                    fontWeight: isActive ? '700' : '500',
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={16} />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Side */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '10px',
                display: 'flex',
              }}
            >
              <Bell size={19} color={colors.gray} />
            </button>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                <User size={15} />
                <span className="account-label">Account</span>
              </button>

              {profileMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '46px',
                    right: 0,
                    backgroundColor: colors.white,
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: `1px solid ${colors.lightGray}`,
                    minWidth: '180px',
                    overflow: 'hidden',
                    zIndex: 200,
                  }}
                >
                  {[
                    { label: 'My Profile', icon: User },
                    { label: 'Settings', icon: Settings },
                    { label: 'Sign Out', icon: LogOut },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          setProfileMenuOpen(false);
                          showToast(`${item.label} clicked (mock)`);
                        }}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          fontSize: '14px',
                          color: colors.dark,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <Icon size={16} color={colors.gray} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      {currentPage === 'explore' && (
        <>
          <header
            style={{
              backgroundColor: colors.white,
              borderBottom: `1px solid ${colors.lightGray}`,
              padding: '32px 16px 28px',
              textAlign: 'center',
            }}
          >
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: colors.dark,
                  margin: '0 0 10px',
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px',
                }}
              >
                Book <span style={{ color: colors.primary }}>anything</span> you want
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  color: colors.gray,
                  margin: '0 0 20px',
                  lineHeight: 1.5,
                  maxWidth: '500px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Hotels, restaurants, movies, events & more — all in one place.
              </p>

              <div
                style={{
                  display: 'flex',
                  backgroundColor: colors.white,
                  borderRadius: '14px',
                  boxShadow: '0 8px 20px -5px rgba(30,58,138,0.15)',
                  border: `2px solid ${colors.primary}`,
                  maxWidth: '560px',
                  margin: '0 auto',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 14px', flex: 1 }}>
                  <Search size={18} color={colors.gray} />
                  <input
                    type="text"
                    placeholder="Search hotels, food, events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      padding: '14px 10px',
                      width: '100%',
                      color: colors.dark,
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
                <button
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.white,
                    border: 'none',
                    padding: '14px 22px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Search
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '24px',
                  marginTop: '20px',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { number: '2.4M+', label: 'Bookings' },
                  { number: '15K+', label: 'Partners' },
                  { number: '4.8★', label: 'Rating' },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: colors.primary }}>
                      {stat.number}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.gray }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <ExplorePage
            services={filteredServices}
            onBook={handleBook}
            onViewDetails={handleViewDetails}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </>
      )}

      {currentPage === 'deals' && <DealsPage onApplyDeal={handleApplyDeal} />}
      {currentPage === 'bookings' && <BookingsPage onCancelBooking={handleCancelBooking} />}
      {currentPage === 'help' && <HelpPage />}
      {currentPage === 'detail' && selectedService && (
        <ServiceDetailPage
          service={selectedService}
          onBack={() => handleNavigate('explore')}
          onBook={handleBook}
        />
      )}

      {/* FOOTER — hidden on mobile since bottom nav takes over */}
      <footer
        className="desktop-footer"
        style={{
          backgroundColor: colors.primary,
          color: colors.white,
          padding: '40px 16px 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div
                  style={{
                    backgroundColor: colors.white,
                    color: colors.primary,
                    width: '32px',
                    height: '32px',
                    borderRadius: '9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '800',
                  }}
                >
                  B
                </div>
                <span style={{ fontSize: '18px', fontWeight: '800' }}>BookEverything</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                Your one-stop destination for booking anything you want.
              </p>
            </div>

            {[
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
              { title: 'Support', links: ['Help Center', 'Contact Us', 'Privacy', 'Terms'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 12px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map((link) => (
                    <li key={link} style={{ marginBottom: '8px' }}>
                      <a
                        href="#"
                        style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.15)',
              marginTop: '28px',
              paddingTop: '20px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0 }}>
              © {new Date().getFullYear()} BookEverything. All rights reserved. (Mock UI)
            </p>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAV */}
      <div className="mobile-bottom-nav">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = currentPage === link.id || (currentPage === 'detail' && link.id === 'explore');
          return (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                padding: '8px 4px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? colors.primary : colors.gray,
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span style={{ fontSize: '10px', fontWeight: isActive ? '700' : '500' }}>{link.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOAST */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
            left: '16px',
            right: '16px',
            backgroundColor: colors.primary,
            color: colors.white,
            padding: '14px 18px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(30,58,138,0.4)',
            fontSize: '14px',
            fontWeight: '600',
            zIndex: 300,
            animation: 'slideIn 0.3s ease',
            textAlign: 'center',
          }}
        >
          {toast}
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; }
        html { -webkit-text-size-adjust: 100%; }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        ::-webkit-scrollbar { height: 6px; width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* Mobile bottom nav — hidden on desktop */
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #ffffff;
          border-top: 1px solid #e2e8f0;
          padding-bottom: env(safe-area-inset-bottom, 0px);
          z-index: 150;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
        }

        /* Desktop nav — hidden on mobile */
        .desktop-nav { display: flex; }

        /* Media queries */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-footer { display: none !important; }
          .mobile-bottom-nav { display: flex !important; }
          .account-label { display: none; }
        }

        @media (max-width: 400px) {
          h1 { font-size: 24px !important; }
        }

        /* Smooth scrolling */
        html { scroll-behavior: smooth; }

        /* Prevent zoom on input focus (iOS) */
        input, button, textarea, select { font-size: 16px; }
        @media (max-width: 768px) {
          input, textarea, select { font-size: 16px !important; }
        }
      `}</style>
    </div>
  );
};

export default App;