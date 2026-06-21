const colors = {
  pending: 'bg-yellow-100 text-yellow-700',
  inprogress: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
  canceled: 'bg-red-100 text-red-700',
};

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${colors[status]}`}>
    {status}
  </span>
);

export default StatusBadge;