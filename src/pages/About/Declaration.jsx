import React from "react";
import NavBar from "../../components/Navbar";
import declare1 from "../../assets/declare1.jpg";
import declare2 from "../../assets/declare2.jpg";
import declare3 from "../../assets/declare3.jpg";
import declare4 from "../../assets/declare4.jpg";

function Declaration() {
  return (
    <div className="text-wrap overflow-x-hidden">
      <NavBar />
      <div className=" ">
        <div className="py-16 flex px-4  flex-col items-center bg-(--textHighlight)">
          <h1 className="md:text-4xl mt-16 text-2xl font-bold text-alpha font">
          Our Declaration of Faith
        </h1>
        <div className="flex flex-col justify-center w-screen items-center gap-4">
          <h1 className="text-2xl max-w-4xl text-justify mt-8 text-alpha">
            {" "}
            These truths comprise the essential faith we hold at Comforter’s
            Lodge (1 Corinthians 15:1-8; 1 Timothy 4:16), and provide the
            foundation for our proclaiming God's glory to all creation (Psalm
            96:3; Isaiah 6:3).{" "}
          </h1>
        </div>
        </div>

        <section className="flex flex-col gap-4 bg-linear-180 from-black/0 to-black/10">
          <div className="px-10">
            <div className="flex items-center gap-8 p-4 ">
              <div className="flex text-black/70  rounded-md p-8 flex-col w-full gap-8">
                <p>
                  1. "I believe in God, the Father Almighty, maker of heaven and
                  earth." The Lord our God is one (Mark 12:29). He is the Father
                  of all believers (2 Corinthians 6:18) and rules sovereously
                  over creation (Psalm 103:19). He formed the world through his
                  divine power as Trinity—Father (Nehemiah 9:6), Son (Hebrews
                  1:2), and Spirit (Job 33:4).{" "}
                </p>{" "}
                <p>
                  2. "And in Jesus Christ his only Son, our Lord." Jesus is our
                  Savior who delivers us from sin (Acts 4:12). He is the
                  Anointed One promised throughout Scripture (Luke 4:18-21). He
                  is God's beloved Son (Mark 1:11; John 3:16). He is Lord over
                  all (Acts 10:36; Philippians 2:11). He proclaimed God's
                  Kingdom (Mark 1:14-15) and will return to establish it fully
                  (1 Thessalonians 4:16-17). He commissions us to make disciples
                  (Luke 24:47) and proclaim his lordship to all peoples.{" "}
                </p>
                <p>
                  3. "He was conceived by the Holy Spirit and born of the Virgin
                  Mary." Christ Jesus willingly took human form (2 Corinthians
                  8:9) through supernatural conception by the Spirit's power
                  (Matthew 1:18, 20). This divine mystery made him fully God and
                  fully man (John 1:14; 1 Timothy 3:16).
                </p>{" "}
              </div>
              <img
                className={`w-2xl bg-cover rounded-lg`}
                src={declare1}
                alt=""
                />
            </div>
            <div className="flex flex-row-reverse my-16 items-center gap-8 p-4 ">
              <div className="flex  rounded-md p-8 flex-col w-full gap-8">
                <p>
                  4. "He suffered under Pontius Pilate, was crucified, died, and
                  was buried." Jesus truly died a physical death (John 19:33-34;
                  Mark 15:44-45). He became the Lamb sacrificed for humanity's
                  sin (1 Peter 1:18-19), bearing our iniquities (Isaiah 53:5-6)
                  to reconcile us to God (Colossians 1:20-22).
                </p>{" "}
                <p>
                  5. "On the third day he rose again from the dead." Christ's
                  bodily resurrection (Luke 24:36-43; John 20:27) demonstrates
                  his victory over death (1 Corinthians 15:54-57). He conquered
                  the grave as foretold (Psalm 16:10; Acts 2:31), confirming all
                  Scripture (Luke 24:44-46) and establishing the gospel message
                  (1 Corinthians 15:3-4).
                </p>{" "}
                <p>
                  6. "He ascended into heaven and is seated at the right hand of
                  God the Father." Jesus was taken up into glory (Luke 24:51; 1
                  Timothy 3:16) where he now reigns (Ephesians 1:20-21) and
                  advocates for believers (Hebrews 7:25; 1 John 2:1).
                </p>{" "}
              </div>
              <img
                className={`w-2xl bg-cover rounded-lg`}
                src={declare4}
                alt=""
                />
            </div>
            <div className="flex items-center gap-8 p-4 ">
              <div className="flex  rounded-md p-8 flex-col w-full gap-8">
                <p>
                  7. "He will come again to judge the living and the dead."
                  Christ will return in the same manner he departed (Revelation
                  1:7; 2 Thessalonians 1:7-10). No one knows the day or hour
                  (Mark 13:32-33), so believers must watch and be prepared
                  (Matthew 25:13; 1 Thessalonians 5:2-6).
                </p>{" "}
                <p>
                  8. "I believe in the Holy Spirit," The Spirit is divine (1
                  Corinthians 2:10-11; 2 Corinthians 3:17-18). He dwells within
                  all who believe (John 14:16-17; Galatians 4:6). His spiritual
                  gifts (1 Corinthians 12:4-11; 1 Peter 4:10-11) empower the
                  Church today. We are commanded to walk in the Spirit
                  (Galatians 5:16, 25) and be filled with his presence
                  continually (Acts 4:31).
                </p>{" "}
                <p>
                  9. "The holy Christian Church, the communion of saints,"
                  Christ established his Church (Ephesians 2:19-22) as his
                  instrument for mission (Acts 2:42-47). All who believe are
                  united in one body (Galatians 3:26-28; Ephesians 4:4-6)
                  joining the great cloud of witnesses throughout history
                  (Revelation 7:9-10).
                </p>{" "}
                
              </div>
              <img
                className={`w-2xl bg-cover h-100 rounded-lg`}
                src={declare2}
                alt=""
              />
            </div>
            <div className="flex flex-row-reverse my-16 items-center gap-8 p-4 ">
              <div className="flex  rounded-md p-8 flex-col w-full gap-8">
                <p>
                  {" "}
                  10. "The forgiveness of sins," Salvation comes through grace
                  alone, received by faith (Romans 3:22-24; Titus 3:4-7). It is
                  God's free gift (Ephesians 1:7-8). Each person must respond
                  individually (Acts 16:31) by acknowledging their sin (Psalm
                  51:3-4; Isaiah 59:2), turning from it (Ezekiel 18:30-32; Acts
                  26:20), and receiving Christ's mercy (1 Timothy 1:15-16)
                  through surrendering to his lordship (Acts 2:36-38). Those who
                  trust Christ become new creations (Galatians 6:15; Ephesians
                  4:24) sealed for eternity (Ephesians 1:13-14; John 6:39).
                  Believers must continually seek God's cleansing (Psalm 51:10;
                  James 5:16). Those who reject salvation face eternal
                  separation from God (2 Thessalonians 1:8-9; Matthew 25:46).
                </p>{" "}
                <p>
                  11. "The resurrection of the body," Christ's rising guarantees
                  our resurrection (Romans 6:5; 2 Corinthians 4:14). Death has
                  no power over believers (Romans 8:38-39; Philippians 1:21).
                  When we die physically, we immediately enter Christ's presence
                  (2 Corinthians 5:6-8; Philippians 1:23).
                </p>{" "}
                <p>
                  12. "And life everlasting." Believers will receive glorified,
                  eternal bodies (Philippians 3:20-21; 1 John 3:2) and dwell
                  with God forever (Revelation 21:3-4; 22:3-5). Jesus offers
                  abundant life in the present (John 6:47; 1 John 5:11-12) and
                  promises eternal dwelling in God's house (John 17:24;
                  Revelation 22:14).
                </p>
              </div>
              <img
                className={`w-2xl bg-cover rounded-lg`}
                src={declare3}
                alt=""
                />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Declaration;
