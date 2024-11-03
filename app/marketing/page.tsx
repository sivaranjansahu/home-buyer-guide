import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { BgPattern } from "@/components/ui/Bgpattern";
import STARAccordion from "@/components/app/STARAccordion";
import Testimonials from "@/components/app/Testimonials";
//import { SignUpButton } from "@/components/marketing/LandingSignUp";

export default async function IndexPage() {

  return (
    <>
      {/* Bg Pattern */}
      <BgPattern />
      {/* Hero Copy */}
     
    </>
  );
}

const scenario =
  "I was working in Microsoft Research healthcare. We were about to launch a mobile app with analytics. I wanted to use out of the box analytics software  like Microsoft Insights. My colleague - Kevin wanted to build his own analytics system so that we can retain raw data for longer duration. However, we did not need to raw data , and we wanted only aggregated data analytics for our user researchers to understand user behavior. I was very frustrated with losing time on the project because of this.I showed Kevin with the help of our user researcher , the benefits of using Microsoft Insights, that will save us time , and also we will not lose out on the requirements we wanted to build. ";
