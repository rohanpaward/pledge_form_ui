// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BadgeCheck, Briefcase, Calendar, MapPin, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";
import { BASE_API_URL } from '../../apiconst';

const CARD_HEIGHT = 320;
const CARD_MIN_WIDTH = 300; // Minimum card width

const PledgeWall = () => {
  const [pledges, setPledges] = useState([]);

  useEffect(() => {
    fetch(`${BASE_API_URL}/public-pledges`)
      .then((res) => res.json())
      .then((data) => setPledges(data))
      .catch((err) => console.error("Error fetching pledges:", err));
  }, []);

  const Cell = ({ columnIndex, rowIndex, style, data }) => {
    const index = rowIndex * data.columnCount + columnIndex;
    if (index >= data.items.length) return null;
    const p = data.items[index];

    return (
      <div style={{ ...style, padding: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.01 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white border border-green-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">Name:</span>
              <span>{p['Name']}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">Date:</span>
              <span>{p['Date']}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="font-semibold">State:</span>
              <span>{p['State']}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold">Profile:</span>
              <span>{p['Profile']}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <Star className="w-5 h-5 text-yellow-500 mt-1" />
              <div>
                <div className="font-semibold">Love for Planet:</div>
                <div className="text-sm text-gray-600 mt-1">{p['Love for Planet']}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3fdf4] flex flex-col">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-green-800 py-8 flex items-center justify-center gap-3"
      >
        <BadgeCheck className="w-8 h-8 text-green-600" />
        Public Pledge Wall
      </motion.h2>

      <div className="flex-1 max-w-7xl mx-auto w-full overflow-y-auto px-4 custom-scrollbar">

        <AutoSizer>
          {({ width, height }) => {
            const columnCount = Math.floor(width / CARD_MIN_WIDTH) || 1;
            const columnWidth = width / columnCount;
            const rowCount = Math.ceil(pledges.length / columnCount);

            return (
              <Grid
                columnCount={columnCount}
                columnWidth={columnWidth}
                height={height}
                rowCount={rowCount}
                rowHeight={CARD_HEIGHT}
                width={width}
                itemData={{ items: pledges, columnCount }}
              >
                {Cell}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 px-4 py-6 border-t border-green-200 bg-[#f3fdf4]">
        <p>
          <strong>Privacy Note:</strong> Mobile Number and Email are required for validation but never shown publicly.
          Data is used only for verification and engagement.
        </p>
      </footer>
    </div>
  );
};

export default PledgeWall;
