import { Row, Col } from 'antd';

export default function BannerSlider() {
  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      {/* Top Sách Bán Chạy */}
      <Col xs={24} lg={12}>
        <div style={{
          background: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
          borderRadius: 12,
          padding: 16,
          color: 'white',
          height: 160
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 'bold', margin: 0, color: 'white' }}>Top Sách Bán Chạy</h3>
              <p style={{ fontSize: 14, opacity: 0.9, margin: '4px 0', color: 'white' }}>Từ 1000 books Tại Tiki Trading</p>
            </div>
            <div style={{ fontSize: 48, fontWeight: 'bold', opacity: 0.2, color: 'white' }}>1998</div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <img src="https://placehold.co/60x80?text=Book1" alt="book" style={{ width: 40, height: 56, borderRadius: 4, objectFit: 'cover' }} />
            <img src="https://placehold.co/60x80?text=Book2" alt="book" style={{ width: 40, height: 56, borderRadius: 4, objectFit: 'cover' }} />
            <img src="https://placehold.co/60x80?text=Book3" alt="book" style={{ width: 40, height: 56, borderRadius: 4, objectFit: 'cover' }} />
          </div>
        </div>
      </Col>

      {/* Bộ Sưu Tập Sách Mới Giảm Đến */}
      <Col xs={24} lg={12}>
        <div style={{
          background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
          borderRadius: 12,
          padding: 16,
          color: 'white',
          height: 160
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 'bold', margin: 0, color: 'white' }}>Bộ Sưu Tập Sách Mới Giảm Đến</h3>
              <p style={{ fontSize: 14, opacity: 0.9, margin: '4px 0', color: 'white' }}>Từ 1000 books Tại Tiki Trading</p>
            </div>
            <div style={{ fontSize: 48, fontWeight: 'bold', opacity: 0.2, color: 'white' }}>1998</div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <img src="https://placehold.co/60x80?text=Book4" alt="book" style={{ width: 40, height: 56, borderRadius: 4, objectFit: 'cover' }} />
            <img src="https://placehold.co/60x80?text=Book5" alt="book" style={{ width: 40, height: 56, borderRadius: 4, objectFit: 'cover' }} />
            <img src="https://placehold.co/60x80?text=Book6" alt="book" style={{ width: 40, height: 56, borderRadius: 4, objectFit: 'cover' }} />
          </div>
        </div>
      </Col>
    </Row>
  );
}
  