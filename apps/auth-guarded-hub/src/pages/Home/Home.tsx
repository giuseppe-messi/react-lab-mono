import { useMemo } from "react";
import clsx from "clsx";
import { LoadingSpinner } from "@react-lab-mono/ui";
import { useAuth } from "../../contexts/AuthContext";
import { tierMap } from "../../helpers/tierMap";
import { useFetch } from "../../hooks/useFetch";
import { ROUTES, type RouteKey } from "../../api/routes";
import type { PagePayload } from "../../interfaces/pageContent";
import { PLAN_TIER } from "../../interfaces/plan";
import styles from "./Home.module.css";

const Home = () => {
  const auth = useAuth();
  const user = auth?.user;
  const isLoadingUser = auth?.isLoadingUser;

  const { data, isLoading: isLoadingContent } = useFetch<PagePayload>({
    url: ROUTES.RESTRICTED_PAGE_INFO as RouteKey,
    params: useMemo(() => ({ slug: "home" }), []),
    cacheKey: user ? `${user.email}-${user.plan}` : "public"
  });

  const homeInfo = useMemo(() => data?.slots["home-info"], [data]);
  const homeMainContent = useMemo(
    () => data?.slots["home-main-content"],
    [data]
  );

  const missingOutOnContentBanner = useMemo(
    () =>
      user?.plan !== PLAN_TIER.PRO && (
        <div className={styles.homeInfoBox}>
          {!user ? (
            <p>
              Your missing out on some great content in this section! Login or
              Register to see it!
            </p>
          ) : (
            <p>
              You are on a {user.plan} plan! <br /> Your missing out on some
              great content in this section! Upgrade your plan!
            </p>
          )}
        </div>
      ),
    [user]
  );

  const isLoading = isLoadingUser || isLoadingContent;

  return (
    <div className="container">
      <header className="hero">
        <h1>Auth-Guarded Hub</h1>
        <p className="sub">
          A focused demo of protected routes with server-side sessions
          (HTTP-only cookie), built with React, Netlify Functions, Prisma, and
          Neon Postgres.
        </p>
      </header>

      <section className="card">
        <h2>Home Info</h2>

        {Boolean(isLoading) && <LoadingSpinner size="sm" />}

        {!isLoading && (
          <>
            <div className={styles.homeInfoWrapper}>
              {homeInfo?.map((p) => (
                <div
                  className={clsx(
                    styles.homeInfoBox,
                    styles[`homeInfoBox-${tierMap[p.plan].className}`]
                  )}
                  key={p.id}
                >
                  <h3>{p.payload.heading}</h3>
                  <p>{p.payload.text}</p>
                </div>
              ))}
            </div>
            {missingOutOnContentBanner}
          </>
        )}
      </section>

      <section className="card">
        <h2>Main Content</h2>

        {Boolean(isLoading) && <LoadingSpinner size="sm" />}

        {!isLoading && (
          <>
            <div className={styles.homeInfoWrapper}>
              {homeMainContent?.map((p) => (
                <div
                  className={clsx(
                    styles.homeInfoBox,
                    styles[`homeInfoBox-${tierMap[p.plan].className}`]
                  )}
                  key={p.id}
                >
                  <p>{p.payload.text}</p>
                </div>
              ))}
            </div>
            {missingOutOnContentBanner}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
