import Image from "next/image";

interface Attraction {
  id: number;
  name: string;
  detail: string;
  coverimage: string;
  latitude: number;
  longitude: number;
}

async function getAttractions(): Promise<Attraction[]> {
  const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';
  // Use no-store to ensure fresh data, similar to the original client-side fetch
  const res = await fetch(`${apiHost}/attractions`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch attractions");
  }

  return res.json();
}

export default async function Page() {
  const rows = await getAttractions();

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">แหล่งน่าเที่ยวน่าสนใจ</h1>
        <p className="subtitle">Discover points of interest</p>
      </header>

      {!rows || rows.length === 0 ? (
        <div className="empty">No attractions found.</div>
      ) : (
        <section className="grid" aria-live="polite">
          {rows.map((x) => (
            <article key={x.id} className="card" tabIndex={0}>
              {x.coverimage && (
                <div className="media" style={{ position: 'relative' }}>
                  <Image
                    src={x.coverimage}
                    alt={x.name}
                    fill
                    className="img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="body">
                <h3 className="card-title">{x.name}</h3>
                {x.detail && <p className="detail">{x.detail}</p>}
                <div className="meta">
                  <small>
                    Lat: <span className="code">{x.latitude}</span> · Lng:{" "}
                    <span className="code">{x.longitude}</span>
                  </small>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}