import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/animate-ui/components/radix/accordion";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { BookOpen, Leaf, Music } from "lucide-react";

export default function SiteFeatures() {
  const accordionItems = [
    {
      id: "truth",
      title: "Focus on Truth",
      subtitle: "Center your heart on what doesn't change.",
      icon: BookOpen,
      content: (
        <>
          <p className="text-lg text-muted-foreground mb-4">
            Daily biblical insights help cut through distraction and re-anchor
            your thoughts in God's Word.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-2 text-sm rounded-full border border-(--primary)">
              Scripture-based Reflections
            </span>
            <span className="px-3 py-2 text-sm rounded-full border border-(--primary)">
              Daily Clarity and Grounding
            </span>
          </div>
        </>
      ),
    },
    {
      id: "worship",
      title: "Weekday Worship",
      subtitle: "Worship that meets you midweek, not just on Sunday.",
      icon: Music,
      content: (
        <>
          <p className="text-lg text-muted-foreground mb-4">
            Experience guided worship moments and prayers designed for ordinary
            days, busy mornings, and quiet evenings.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-2 text-sm rounded-full border border-(--primary)">
              Consistent Growth
            </span>
            <span className="px-3 py-2 text-sm rounded-full border border-(--primary)">
              Connection through Worship
            </span>
          </div>
        </>
      ),
    },
    {
      id: "meditation",
      title: "Guided Meditation",
      subtitle: "Step out of anxiety and into stillness.",
      icon: Leaf,
      content: (
        <>
          <p className="text-lg text-muted-foreground mb-4">
            When prayer feels hard, let gentle guidance help you slow down and
            reconnect with God in a personal way.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-2 text-sm rounded-full border border-(--primary)">
              Deep Reflection
            </span>
            <span className="px-3 py-2 text-sm rounded-full border border-(--primary)">
              Structured Spiritual Focus
            </span>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="relative">
      {/* PART 1: EXPERIENCE GOD IN A FRESH WAY */}
      <section className="w-full">
        <div className="w-full text-wrap">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* SECTION HEADING */}
              <div className="w-full flex flex-col gap-4">
                <legend className="section-title">
                  <span className="text-(--textHighlight)">
                    {"Experience God"}
                  </span>
                  <span className="text-black/90">{" in a Different Way"}</span>
                </legend>
                <p className="text-black/60 text-xl font-normal italic">
                  {
                    "Transform your daily walk with resources designed to help you hear His voice and feel His presence in the midst of your busy life."
                  }
                </p>
              </div>

              {/* SECTION CONTENT */}
              <div className="w-full">
                <Tabs
                  defaultValue="daily-devotional"
                  className="w-full bg-(--secondary) border-2 border-(--primary) rounded-2xl"
                >
                  <div className="rounded-2xl px-2 pt-4 w-fit max-w-full overflow-auto">
                    <TabsList>
                      <div className="w-full h-fit flex gap-2 sm:gap-4">
                        <TabsTrigger
                          value="daily-devotional"
                          className="bg-transparent transform-[scale(0.9)] font-normal data-[state=active]:font-medium focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-none text-lg"
                        >
                          Daily Devotional
                        </TabsTrigger>
                        <TabsTrigger
                          value="community"
                          className="bg-transparent transform-[scale(0.9)] font-normal data-[state=active]:font-medium focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-none text-lg"
                        >
                          Community
                        </TabsTrigger>
                        <TabsTrigger
                          value="guided-prayer"
                          className="bg-transparent transform-[scale(0.9)] font-normal data-[state=active]:font-medium focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-none text-lg"
                        >
                          Guided Prayer
                        </TabsTrigger>
                      </div>
                    </TabsList>
                  </div>

                  <div className="rounded-2xl p-4 text-lg">
                    <TabsContents>
                      {[
                        {
                          name: "daily-devotional",
                          paragraph:
                            "A growing relationship with God thrives on consistent, daily connection. Each month, thousands of readers use our daily reflections to pause, center their hearts on Scripture, and discover God in a deeper, more personal way. It's more than just reading; it's about a life-changing encounter with the Word that carries you through your day.",
                          btnText: "Explore Our Feed",
                          btnActivity: () => {},
                        },
                        {
                          name: "community",
                          paragraph:
                            "Join a vibrant, global family of believers where you can share your journey, find encouragement, and grow alongside others. Through our discussion groups and shared stories, you’ll find a safe space to ask questions, offer support, and experience the strength that comes from walking together in Christ. Faith was never meant to be lived alone.",
                          btnText: "Join Our Community",
                          btnActivity: () => {},
                        },
                        {
                          name: "guided-prayer",
                          paragraph:
                            "The heartbeat of the Christian life is prayer, yet we all have moments when we don't know what to say. Our guided prayer sessions provide a gentle structure to help you quiet the noise and enter into a meaningful conversation with your Creator. Whether you are seeking peace, interceding for others, or offering praise, these prompts help you align your heart with His.",
                          btnText: "Send a Message",
                          btnActivity: () => {},
                        },
                      ].map((_, index) => {
                        return (
                          <TabsContent key={index} value={_.name}>
                            <div className="space-y-5">
                              {/* FEATURE PARAGRAPH */}
                              <p>{_.paragraph}</p>

                              {/* ACTION BUTTON */}
                              <button
                                className={`font-medium rounded-full px-6 py-4 text-black bg-(--primary) text-base border-2 border-(--primary) hover:text-black hover:bg-(--secondary) duration-300`}
                                onClick={_.btnActivity}
                              >
                                {_.btnText}
                              </button>
                            </div>
                          </TabsContent>
                        );
                      })}
                    </TabsContents>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 2: START WHERE YOU ARE */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 text-wrap">
        {/* Left column */}
        <div className="relative flex flex-col gap-6">
          <legend className="section-title">
            Start Where <span className="text-(--textHighlight)">You Are</span>
          </legend>
          <p className="text-xl">
            {"Choose one place to begin. Unfold the rest when you're ready."}
          </p>
          <p className="text-xl max-w-md">
            {
              "In a noisy world, spiritual growth doesn't start with doing more. It starts with paying attention."
            }
          </p>

          <div className="absolute top-0 right-0 h-full w-px bg-(--primary) hidden md:block" />
        </div>

        {/* Right column */}
        <div className="space-y-4 text-wrap">
          <Accordion
            type={"single"}
            collapsible={false}
            className="w-full max-w-2xl ml-auto"
          >
            {accordionItems.map((_, index) => {
              const Icon = _.icon;
              return (
                <AccordionItem key={index} value={_.id}>
                  <AccordionTrigger showArrow={true}>
                    <div className="flex items-start gap-4 decoration-0">
                      <Icon className="h-8 w-8 text-(--textHighlight) mt-1" />
                      <div>
                        <h3 className="text-xl font-medium">{_.title}</h3>
                        <p className="text-lg font-normal">{_.subtitle}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent keepRendered={true}>
                    <div className="px-6 pb-6">{_.content}</div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="pt-8 text-center">
            <p className="mb-3">Not sure where to start?</p>
            <Button
              variant={"default"}
              size={"default"}
              className="px-6 py-6 rounded-full border border-(--primary) bg-(--secondary) hover:border-(--primary) hover:bg-(--secondary)"
            >
              Help me choose
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
