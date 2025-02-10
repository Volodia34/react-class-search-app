import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '@modules/core/components/Loader/Loader';

interface DetailData {
  name: string;
  description: string;
}

const DetailPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      // Імітуємо додатковий API виклик
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData({
        name: `Pokemon ${id}`,
        description: `Detailed description for Pokemon ${id}.`,
      });
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  const handleClose = () => {
    navigate(`/?page=${currentPage}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return <p>No details available</p>;
  }

  return (
    <div style={{ padding: '16px' }}>
      <button onClick={handleClose}>Закрити</button>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
    </div>
  );
};

export default DetailPanel;
