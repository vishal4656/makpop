"use client";

import { useState } from "react";
import { Search, MessageCircle, HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// --- Data with Categories ---
const faqs = [
  {
    category: "Product",
    question: "What is Makhana?",
    answer: "Makhana, also known as foxnuts or lotus seeds, are edible seeds from the lotus flower plant. They've been used in traditional Indian cuisine and Ayurveda for centuries. Our makhana is carefully sourced, roasted, and flavored to create a delicious healthy snack."
  },
  {
    category: "Health",
    question: "Is Makpop suitable for weight loss?",
    answer: "Yes! Makhana is naturally low in calories and fat while being high in protein and fiber. A 30g serving contains only 110-125 calories, making it an excellent choice for weight-conscious individuals. It keeps you full longer and prevents unhealthy cravings."
  },
  {
    category: "Health",
    question: "Are your products gluten-free?",
    answer: "Absolutely! All Makpop products are 100% gluten-free as makhana is naturally gluten-free. Our seasonings are also carefully selected to be gluten-free, making our snacks safe for people with celiac disease or gluten sensitivity."
  },
  {
    category: "Product",
    question: "Do you use any artificial preservatives?",
    answer: "No. We believe in keeping things natural. Makpop products contain no artificial preservatives, no MSG, and no harmful chemicals. We use natural ingredients and proper packaging to maintain freshness."
  },
  {
    category: "Product",
    question: "What is the shelf life?",
    answer: "Our products have a shelf life of 6 months from the date of manufacturing when stored in a cool, dry place. We recommend consuming within 30 days of opening for best taste and freshness."
  },
  {
    category: "Health",
    question: "Can children consume Makpop?",
    answer: "Yes! Makpop is perfect for children above 3 years of age. It's a healthy alternative to chips and other junk food. The crunchy texture and delicious flavors make it appealing to kids while providing essential nutrients."
  },
  {
    category: "Shipping",
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for unopened products. If you receive a damaged or defective product, please contact us within 48 hours with photos, and we'll arrange a replacement or full refund."
  },
  {
    category: "Shipping",
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free shipping on all orders above ₹499. For orders below ₹499, a nominal shipping charge of ₹49 applies."
  },
  {
    category: "Shipping",
    question: "Which payment methods do you accept?",
    answer: "We accept all major payment methods including UPI, Credit/Debit Cards, Net Banking, and popular digital wallets through our secure payment gateway powered by Razorpay."
  },
  {
    category: "Health",
    question: "Is Makpop suitable for diabetics?",
    answer: "Makhana has a low glycemic index, making it a better snacking option for diabetics compared to regular snacks. However, we always recommend consulting with your doctor or nutritionist before making any dietary changes."
  },
];

const categories = ["All", "Product", "Health", "Shipping"];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter Logic
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-cream-50 min-h-screen relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        
        {/* Header & Search */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <SectionHeading 
            title="Frequently Asked Questions"
            subtitle="How can we help?"
          />
          
          {/* Interactive Search Bar */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 relative max-w-lg mx-auto"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-green-800/50" />
            </div>
            <input
              type="text"
              placeholder="Search for calories, shipping, ingredients..."
              className="w-full pl-11 pr-4 py-4 rounded-full border border-green-900/10 bg-white shadow-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-charcoal-800 placeholder:text-charcoal-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-green-900 text-white shadow-md transform scale-105"
                    : "bg-white text-charcoal-600 border border-green-900/10 hover:bg-green-50 hover:border-green-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto min-h-[400px]">
          <Accordion type="single" collapsible className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.question} // Use unique key for animation
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <AccordionItem 
                      value={`item-${index}`} 
                      className="bg-white border border-green-900/5 rounded-xl px-6 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 overflow-hidden group data-[state=open]:border-green-500 data-[state=open]:shadow-green-100 data-[state=open]:ring-1 data-[state=open]:ring-green-500/20"
                    >
                      <AccordionTrigger className="text-left py-5 text-lg font-semibold text-green-950 hover:text-green-700 transition-colors [&[data-state=open]>svg]:rotate-180">
                        <span className="flex items-center gap-3">
                          {activeCategory === "All" && (
                             <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-cream-100 text-green-800 tracking-wider">
                               {faq.category}
                             </span>
                          )}
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-charcoal-600 leading-relaxed text-base pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))
              ) : (
                // Empty State
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="h-8 w-8 text-charcoal-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-900">No results found</h3>
                  <p className="text-charcoal-500">Try adjusting your search or browsing all categories.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                    className="mt-4 text-sm font-semibold text-green-700 hover:underline"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-20 text-center bg-green-900 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
        >
           {/* Glow Effect */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="relative z-10">
             <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4">
                <MessageCircle className="h-6 w-6 text-cream-50" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
             <p className="text-green-100/80 mb-6">Can't find the answer you're looking for? Our team is here to help!</p>
             <button className="bg-white text-green-950 px-8 py-3 rounded-full font-bold hover:bg-cream-50 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-200">
               Contact Support
             </button>
           </div>
        </motion.div>

      </div>
    </div>
  );
}