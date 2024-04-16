import AppBarComponent from "../components/AppBar/AppBarComponent";
import { Helmet } from "react-helmet";

export default function SettingsPage() {
  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Settings | Ewabey Controls</title>
        <meta name="description" content="Ewabey Controls provides an intuitive and powerful administrative dashboard for managing your Ewabey account. Streamline your workflow, track orders, and access important analytics all from one centralized platform. With Ewabey Controls, you can efficiently oversee your website building projects, monitor user activity, and make data-driven decisions to optimize your online presence. Take control of your Ewabey experience and unlock the full potential of your website building journey with Ewabey Controls."/>
        <meta name="keywords" content="Website creation, Web design services, Business websites, Personal websites, Custom website development, Professional web development, Online presence, Website building platform, Web design solutions, Affordable website design, Freelance web designer, Freelance web developer, Freelance website builder, Freelance web design services, Hire freelance web developer"/>
        <meta name="author" content="Goutam Halder" />
        <meta name="robots" content="index, follow"/>

        <meta property="og:title" content="Ewabey Controls"/>
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Welcome to Ewabey - Your Destination for Professional Website Creation Services. Whether You're a Business or Individual, Ewabey Offers Tailored Solutions to Bring Your Online Vision to Life. Place Your Order Today and Let Our Expert Team Build the Website of Your Dreams!"/>
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/estore-cc97f.appspot.com/o/img%2FEwabey.png?alt=media&token=3122afc3-0cd8-4546-ae52-dc82490aa3ce"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Ewabey Controls"/>
        <meta name="twitter:description" content="Welcome to Ewabey - Your Destination for Professional Website Creation Services. Whether You're a Business or Individual, Ewabey Offers Tailored Solutions to Bring Your Online Vision to Life. Place Your Order Today and Let Our Expert Team Build the Website of Your Dreams!"/>
        <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/estore-cc97f.appspot.com/o/img%2FEwabey.png?alt=media&token=3122afc3-0cd8-4546-ae52-dc82490aa3ce"/>

        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/estore-cc97f.appspot.com/o/img%2FEwabey.ico?alt=media&token=d4180596-eb19-4fae-ac95-790c6d122a9f"
          type="image/x-icon"
        />
      </Helmet>
      <AppBarComponent />
      <h1>Settings Page</h1>
    </div>
  );
}
