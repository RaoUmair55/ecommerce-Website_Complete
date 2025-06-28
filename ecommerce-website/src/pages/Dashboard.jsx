import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    topSellingProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/orders/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(data);
      } catch (err) {
        showToast('Failed to load dashboard stats', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [showToast]);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  const chartData = {
    labels: stats.topSellingProducts.map(product => product.name),
    datasets: [
      {
        label: 'Total Sold',
        data: stats.topSellingProducts.map(product => product.totalSold),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Selling Products',
      },
    },
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 rounded-4 p-3 animate__animated animate__fadeIn">
            <div className="d-flex align-items-center">
              <div className="icon bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                <i className="bi bi-cart text-primary fs-4"></i>
              </div>
              <div>
                <h6 className="mb-1">Total Orders</h6>
                <h3 className="mb-0">{stats.totalOrders}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 rounded-4 p-3 animate__animated animate__fadeIn">
            <div className="d-flex align-items-center">
              <div className="icon bg-success bg-opacity-10 rounded-circle p-3 me-3">
                <i className="bi bi-currency-dollar text-success fs-4"></i>
              </div>
              <div>
                <h6 className="mb-1">Total Revenue</h6>
                <h3 className="mb-0">${stats.totalRevenue.toFixed(2)}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 rounded-4 p-3 animate__animated animate__fadeIn">
            <div className="d-flex align-items-center">
              <div className="icon bg-info bg-opacity-10 rounded-circle p-3 me-3">
                <i className="bi bi-graph-up text-info fs-4"></i>
              </div>
              <div>
                <h6 className="mb-1">Avg Order Value</h6>
                <h3 className="mb-0">${stats.averageOrderValue.toFixed(2)}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 rounded-4 p-3 animate__animated animate__fadeIn">
            <div className="d-flex align-items-center">
              <div className="icon bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                <i className="bi bi-star text-warning fs-4"></i>
              </div>
              <div>
                <h6 className="mb-1">Top Products</h6>
                <h3 className="mb-0">{stats.topSellingProducts.length}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 rounded-4 p-4 animate__animated animate__fadeIn">
            <h5 className="mb-3">Top Selling Products</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Total Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topSellingProducts.map(product => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.totalSold}</td>
                      <td>${product.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 rounded-4 p-4 animate__animated animate__fadeIn">
            <h5 className="mb-3">Top Selling Products Chart</h5>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 