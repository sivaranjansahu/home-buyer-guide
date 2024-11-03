type testimonial = {
  testimonial: string;
  userPic: string;
  name: string;
  title: string;
};
const testimonialsData: testimonial[] = [
  {
    testimonial:
      "I couldn't believe the difference it made. After I tried STAR answers from this service, I felt they are tailor-made for my experiences, and I aced my interviews!",
    userPic: '/images/portraits/pic1.png',
    name: 'Wei Chen',
    title: 'Staff software engineer'
  },
  {
    testimonial:
      "Honestly, I was doubtful at first. But StarInterview AI's answers resonated with my experiences so well that it felt like I was telling my story, not a robot. They truly helped me succeed.",
    userPic: '/images/portraits/pic2.png',
    name: 'Ethan Mitchell',
    title: 'Resident Doctor'
  },
  {
    testimonial:
      "It's rare to find a tool that genuinely saves you time and elevates your game. StarInterview's  answers did just that, making my interviews stand out.",
    userPic: '/images/portraits/pic3.png',
    name: 'Olivia Anderson',
    title: 'Sales Manager'
  }
];

const Testimonial = ({ testimonial }: { testimonial: testimonial }) => {
  const { name, title, testimonial: testD, userPic } = testimonial;
  return (
    <div className="p-4 border border-snuff-900 rounded-xl mb-8 flex flex-col gap-2 justify-between">
      <div className="mb-6 font-normal">{testD}</div>
      <div className="flex flex-row gap-2">
        <img
          src={userPic}
          className="w-12 rounded-full shadow-lg dark:shadow-black/20"
        />
        <div>
          <h5 className="text-sm font-bold">{name}</h5>
          <span className="text-xs">{title}</span>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="container mx-auto my-24 md:px-6">
      <section className="mb-32 ">
        <div className="grid gap-x-6 md:grid-cols-2 lg:gap-x-8">
          {testimonialsData.map((d, i) => (
            <Testimonial testimonial={d} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
