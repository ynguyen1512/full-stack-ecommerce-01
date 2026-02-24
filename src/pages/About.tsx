import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
            accusamus mollitia dignissimos quos odit inventore maxime, tempore
            voluptatum. A tenetur delectus, ullam nemo inventore consequuntur
            sapiente voluptate ipsa velit libero!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            eveniet eum labore ducimus enim voluptates? Neque, at voluptate?
            Reprehenderit pariatur sint reiciendis deserunt minus saepe dolor
            quaerat, temporibus tenetur consequuntur!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, nostrum
            exercitationem nemo, quidem vel, culpa possimus dolor nihil
            excepturi at amet fugit repellat adipisci aspernatur odio voluptatum
            consectetur libero cupiditate?
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
            reiciendis, repudiandae nulla libero excepturi nisi dolores amet,
            perspiciatis, asperiores sequi labore placeat porro numquam illo
            nemo eum sit consequatur voluptate?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
            reiciendis, repudiandae nulla libero excepturi nisi dolores amet,
            perspiciatis, asperiores sequi labore placeat porro numquam illo
            nemo eum sit consequatur voluptate?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
            reiciendis, repudiandae nulla libero excepturi nisi dolores amet,
            perspiciatis, asperiores sequi labore placeat porro numquam illo
            nemo eum sit consequatur voluptate?
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
