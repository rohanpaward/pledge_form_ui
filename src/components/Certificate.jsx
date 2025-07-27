import domtoimage from "dom-to-image";
import { useRef } from "react";
import { FaDownload, FaHeart, FaLeaf, FaMedal } from "react-icons/fa";

const Certificate = ({ name, commitments }) => {
  const certRef = useRef(null);
  const heartCount = Math.min(commitments?.length || 0, 5);

  const handleDownloadPng = () => {
    const node = certRef.current;

    domtoimage
      .toPng(node, {
        width: node.offsetWidth * 2,
        height: node.offsetHeight * 2,
        style: {
          transform: "scale(2)",
          transformOrigin: "top left",
          width: node.offsetWidth + "px",
          height: node.offsetHeight + "px",
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${name}-certificate.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("PNG download error:", error);
      });
  };
  return (
    <div>
      <div
        ref={certRef}
        className="bg-white p-10 rounded-xl shadow-xl text-center mx-auto max-w-none"
      >
        <div className="absolute top-4 right-4 text-green-700 text-2xl">
          <FaMedal />
        </div>

        <div className="text-green-700 text-4xl flex justify-center mb-4">
          <FaLeaf />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Climate Action Certificate</h2>
        <p className="text-lg text-gray-600 mb-2 font-medium">Presented to</p>
        <h3 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">{name}</h3>
        <p className="italic text-green-700 text-lg mb-6">“Cool Enough to Care!”</p>

        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: heartCount }).map((_, i) => (
            <FaHeart key={i} className="text-red-500 text-2xl" />
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Thank you for committing to a better planet. Your actions make a difference!
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleDownloadPng}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          <FaDownload />
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate;
