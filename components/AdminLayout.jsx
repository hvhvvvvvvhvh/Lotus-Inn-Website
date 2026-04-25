import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: 'fa-solid fa-table-columns' },
  { href: '/admin/rooms', label: 'Rooms Management', icon: 'fa-solid fa-bed' },
  { href: '/admin/availability', label: 'Room Availability', icon: 'fa-solid fa-door-open' },
  { href: '/admin/bookings', label: 'Bookings', icon: 'fa-solid fa-calendar-check' },
  { href: '/admin/amenities', label: 'Amenities', icon: 'fa-solid fa-spa' },
  { href: '/admin/messages', label: 'Guest Messages', icon: 'fa-solid fa-envelope' }
];

export default function AdminLayout({ children, title }) {
  const router = useRouter();
  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/images/LotusInnLogo.png" alt="Lotus Inn Guest House" onError={(e)=>{e.currentTarget.src='/images/lotusinn-logo.png';}} />
          <div>
            <h1>Lotus Inn Guest House</h1>
            <p>Admin Panel</p>
          </div>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={router.pathname === item.href ? 'active' : ''}>
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h2>Welcome <span>Lotus Inn Admin</span></h2>
            <p style={{margin:'8px 0 0',color:'#6c7890'}}>{title || 'Manage rooms, bookings and guest communication from one place.'}</p>
          </div>
          <div style={{display:'flex',gap:'14px',alignItems:'center'}}>
            <div className="admin-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input placeholder="Search dashboard" />
            </div>
            <div className="admin-actions">
              <div className="admin-circle"><i className="fa-regular fa-bell"></i><span className="admin-badge">9</span></div>
              <div className="admin-avatar">LG</div>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
