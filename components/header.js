import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'

export default function Header({Title}) {

    return (
      <div>
        <div className="sophsLogoBackgroundContainer">
          <h1 className="homeTitle">{Title ? Title : "Soph's Menu"}</h1>
          <div className="sophsLogoBackground">
            <Link href={{pathname: '/'}}>
              <Image 
                className="sophsLogo"
                src="/images/sophsLogo.png"                
                height={45}
                width={45}
                alt={"Sophias Logo"}
              />
            </ Link>
          </div>
        </div>
        <header className="header">
          <div className="pageLinks">
            <Link className="link" href={{pathname: '/reviews'}}><h2 className="pageLink">Reviews</h2></Link>
            <Link className="link" href={{pathname: '/recipes'}}><h2 className="pageLink">Recipes</h2></Link>
            <Link className="link" href={{pathname: '/profile'}}>
              <svg width="25" height="25" className="instaLogo" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
            </Link>
          </div>
        </header>
      </div>
    )
  }
  