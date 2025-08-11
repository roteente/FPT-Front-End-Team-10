import { Layout, Input, Badge, Button, Space, Dropdown, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Outlet, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { useGetCategoriesQuery } from '@/features/categories/categoryApi';

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const cartCount =
    (useAppSelector((s: any) => s?.cart?.items?.length) as number | undefined) ?? 0;

  const { data: categories, isFetching } = useGetCategoriesQuery();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const onSearch = (q: string) => {
    const sp = new URLSearchParams(params);
    q ? sp.set('q', q) : sp.delete('q');
    sp.set('page', '1');
    setParams(sp, { replace: true });
    navigate('/');
  };

  const categoryItems = [
    { key: 'all', label: <Link to="/">Tất cả</Link> },
    ...((categories ?? []).map((c) => ({
      key: c.id,
      label: <Link to={`/?categoryId=${c.id}`}>{c.name}</Link>,
    })) as any[]),
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header style={{ 
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e8e8e8',
        padding: 0,
        height: 'auto',
        lineHeight: 'normal'
      }}>
        {/* Header container với kích thước Figma */}
        <div style={{ 
          maxWidth: 1640, 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          height: 76,
          gap: 24
        }}>
          {/* Logo */}
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              gap: 8,
              flexShrink: 0
            }}
          >
            <img
              src="/assets/tiki-logo.svg"
              alt="tiki-logo"
              style={{ width: 96, height: 40 }}
            />
            <span style={{ 
              color: '#0a68ff', 
              fontWeight: 500, 
              fontSize: 14 
            }}>
              Tốt & Nhanh
            </span>
          </Link>

          {/* Search - chiếm không gian chính */}
          <div style={{ flex: 1, maxWidth: 800 }}>
            <Input.Search
              allowClear
              enterButton="Tìm kiếm"
              placeholder="Túi rác Inochi 79k/8 cuộn"
              defaultValue={params.get('q') ?? ''}
              onSearch={onSearch}
              style={{ width: '100%' }}
            />
          </div>

          {/* Actions */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 24,
            flexShrink: 0
          }}>
            <Link 
              to="/" 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#666',
                fontSize: 12,
                gap: 4
              }}
            >
              <img
                src="/assets/header_menu_item_home.svg"
                alt="Trang chủ"
                style={{ width: 22, height: 22 }}
              />
              <span>Trang chủ</span>
            </Link>

            <Link 
              to="/blank" 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#666',
                fontSize: 12,
                gap: 4
              }}
            >
              <img
                src="/assets/header_header_account_img.svg"
                alt="Tài khoản"
                style={{ width: 22, height: 22 }}
              />
              <span>Tài khoản</span>
            </Link>

            <Link 
              to="/cart" 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#666',
                fontSize: 12,
                gap: 4,
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src="/assets/header_header_img_Cart.svg"
                  alt="Giỏ hàng"
                  style={{ width: 22, height: 22 }}
                />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    backgroundColor: '#ff424e',
                    color: 'white',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 500
                  }}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Giỏ hàng</span>
            </Link>
          </div>
        </div>
      </Header>

      <Content style={{ 
        backgroundColor: '#f5f5f5',
        padding: 0,
        minHeight: 'calc(100vh - 76px - 80px)' // Header height + Footer height
      }}>
        <Outlet />
      </Content>

      <Footer style={{ 
        backgroundColor: '#f5f5f5', 
        textAlign: 'center',
        padding: '24px 0',
        borderTop: '1px solid #e8e8e8',
        height: 80
      }}>
        <div style={{ maxWidth: 1640, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
            © {new Date().getFullYear()} Nhà Sách Tiki - Tốt & Nhanh
          </div>
          <div style={{ fontSize: 12, color: '#999' }}>
            Địa chỉ: 52 Út Tịch, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh
          </div>
        </div>
      </Footer>
    </Layout>
  );
}
