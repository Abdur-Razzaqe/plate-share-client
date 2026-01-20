import { Disclosure } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

const faqs = [
  {
    q: "How can I donate food?",
    a: "Register and add your food post with location and expiry.",
  },
  {
    q: "How do I request food?",
    a: "Browse available foods and click 'Request' to submit your request.",
  },
  { q: "Is it free?", a: "Yes! PlateShare is completely free to use." },
];

const FAQ = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((f, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <div className="border border-pink-100 dark:border-gray-700 rounded-xl p-4">
                <Disclosure.Button className="flex justify-between w-full text-left text-gray-800 dark:text-gray-100 font-medium">
                  {f.q}{" "}
                  <IoIosArrowDown
                    className={`${open ? "rotate-180" : ""} transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  {f.a}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
