import LogoImage from "@logos/Edoc-XProScenium.svg";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Young } from "./ui/fonts";


function Logo() {
  const style = {
    fontSize: "30px",
    fontWeight: "400"
  }

  const spanStyle = {
    fontWeight: '800'
  }
  return (


    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex items-center">
        {/* <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center">
          
        </AspectRatio> */}
        <h1 style={style} className={`${Young.className} antialiased`}><span style={spanStyle}>प्रो</span>SCENIUM</h1>
      </div>
    </Link>
  )
};

export default Logo