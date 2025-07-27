import { Briefcase, GraduationCap, Handshake, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { BASE_API_URL } from '../../apiconst';

const KpiSection = () => {
  const [total, setTotal] = useState(0);
  const [students, setStudents] = useState(0);
  const [working, setWorking] = useState(0);

  useEffect(() => {
    fetch(`${BASE_API_URL}/public-pledges/counts`)
      .then(res => res.json())
      .then(data => {
        setTotal(data.total);
        setStudents(data.students);
        setWorking(data.working);
      })
      .catch(err => console.error('Failed to fetch KPI data:', err));
  }, []);

  const stats = [
    { icon: <Users size={32} className="text-green-600" />, label: 'Target Pledges', count: 1000000 },
    { icon: <Handshake size={32} className="text-green-600" />, label: 'Achieved Pledges', count: total },
    { icon: <GraduationCap size={32} className="text-green-600" />, label: 'Students', count: students },
    { icon: <Briefcase size={32} className="text-green-600" />, label: 'Working Professionals', count: working },
  ];

  return (
    <section className="bg-white py-20 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-800">Our Impact So Far</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-center items-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-2">{stat.icon}</div>
            <h3 className="text-3xl font-bold text-green-700">
              <CountUp end={stat.count} duration={2} />
            </h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KpiSection;
