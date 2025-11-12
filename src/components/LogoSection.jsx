import hooli from "../assets/hooli.png";
import lyft from "../assets/lyft.png";
import leaf from "../assets/leaf.png";
import stripe from "../assets/stripe.png";
import aws from "../assets/aws.png";
import reddit from "../assets/reddit.png";

const LogoSection = () => {
  return (
    
    <section className="w-full bg-[#FAFAFA] flex justify-center items-center h-[175px]">
     
      <div className="flex justify-between items-center w-[1050px]">
        <div className="flex flex-col items-center justify-center w-[153px] h-[34px]">
          <img
            src={hooli}
            alt="Hooli Logo"
            className="w-[103px] h-[34px] object-contain opacity-80 hover:opacity-100 transition"
          />
        </div>

        {/* 2️⃣ Lyft */}
        <div className="flex flex-col items-center justify-center w-[146px] h-[59px]">
          <img
            src={lyft}
            alt="Lyft Logo"
            className="w-[83px] h-[59px] object-contain opacity-80 hover:opacity-100 transition"
          />
        </div>

        {/* 3️⃣ Leaf */}
        <div className="flex flex-col items-center justify-center w-[152px] h-[75px]">
          <img
            src={leaf}
            alt="Leaf Logo"
            className="w-[102px] h-[75px] object-contain opacity-80 hover:opacity-100 transition"
          />
        </div>

        {/* 4️⃣ Stripe */}
        <div className="flex flex-col items-center justify-center w-[151px] h-[42px]">
          <img
            src={stripe}
            alt="Stripe Logo"
            className="w-[103px] h-[42px] object-contain opacity-80 hover:opacity-100 transition"
          />
        </div>

        {/* 5️⃣ AWS */}
        <div className="flex flex-col items-center justify-center w-[151px] h-[62px]">
          <img
            src={aws}
            alt="AWS Logo"
            className="w-[104px] h-[62px] object-contain opacity-80 hover:opacity-100 transition"
          />
        </div>

        {/* 6️⃣ Reddit */}
        <div className="flex flex-col items-center justify-center w-[151px] h-[72px]">
          <img
            src={reddit}
            alt="Reddit Logo"
            className="w-[76px] h-[72px] object-contain opacity-80 hover:opacity-100 transition"
          />
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
