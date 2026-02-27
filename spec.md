# Specification

## Summary
**Goal:** Build a professional, animated public-facing hospital website for SAMPARC MEDICAL with a teal/green and gold theme, a protected admin dashboard for content and medicine management, and a frontend-only AI chat assistant widget.

**Planned changes:**

### Frontend – Public Website
- Animated hero section with hospital name, tagline, and hero banner image
- Navigation bar with logo and links: Home, About Us, Services, Medicines, Contact Us, Admin
- About Us section with profile cards for Founder Director/Secretary AMITKUMAR BANERJEE and CEO ANUJ SINGH
- Services section with at least 6 service cards (icons + descriptions), content pulled from backend
- Medicines/Pharmacy public page listing all medicines (name, description, price) fetched from backend
- Contact section with full address, email (samparc6@gmail.com), customer care (+91 9766343454), cross WhatsApp (+91 9270556455), CEO contact/WhatsApp (+91 9766343456), all WhatsApp links using wa.me URLs
- Site-wide footer with address, contacts, tagline "Your Health, Our Mission", and copyright notice
- Floating AI chat assistant widget (bottom-right) with scripted responses about SAMPARC MEDICAL (location, hours, services, contact info), session-persistent chat history, frontend-only (no external API)
- Smooth scroll animations on all major sections; responsive on mobile, tablet, and desktop; white/teal/gold color palette throughout

### Frontend – Admin Dashboard
- `/admin` route with login form; credentials: gauravsaswade2009@gmail.com / p1love2g
- Session stored in localStorage; unauthenticated access redirects to `/admin`
- `/admin/dashboard` with sidebar navigation: Overview, Medicines, Content Editor
- Overview panel with medicine count and quick stats
- Medicines Manager: table of medicines with Add, Edit, Delete; form fields: name, description, price, category, availability
- Content Editor: editable text areas for hero, about, services, and announcements sections with Save button
- Success/error toast notifications on all operations; Logout button

### Backend (Motoko)
- `Medicine` record: id (Nat), name (Text), description (Text), price (Float), category (Text), available (Bool); stable storage
- `addMedicine`, `updateMedicine`, `deleteMedicine`, `getMedicines` functions
- `getContent(key: Text)` and `updateContent(key: Text, value: Text)` functions with stable storage; default content pre-populated for hero, about, services sections

**User-visible outcome:** Visitors can browse the SAMPARC MEDICAL website, view services, medicines, team bios, and contact info, and chat with the AI assistant. The admin can log in from any device to add/edit/delete medicines and update website content, with all changes reflected on the public site.
