export function PolkadotLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      version="1.1"
      id="Logo"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 1326.1 1410.3"
      xmlSpace="preserve"
      fill="var(--polkadot-cyan)"
      width={34}
      height={40}
      {...props}
    >
      <ellipse
        className="st0"
        cx="663"
        cy="147.9"
        rx="254.3"
        ry="147.9"
        fill="var(--polkadot-purple)"
      />
      <ellipse
        className="st0"
        cx="663"
        cy="1262.3"
        rx="254.3"
        ry="147.9"
        fill="var(--polkadot-purple)"
      />
      <ellipse
        transform="matrix(0.5 -0.866 0.866 0.5 -279.1512 369.5916)"
        className="st0"
        cx="180.5"
        cy="426.5"
        rx="254.3"
        ry="148"
        fill="var(--polkadot-purple)"
      />
      <ellipse
        transform="matrix(0.5 -0.866 0.866 0.5 -279.1552 1483.9517)"
        className="st0"
        cx="1145.6"
        cy="983.7"
        rx="254.3"
        ry="147.9"
        fill="var(--polkadot-purple)"
      />
      <ellipse
        transform="matrix(0.866 -0.5 0.5 0.866 -467.6798 222.044)"
        className="st0"
        cx="180.5"
        cy="983.7"
        rx="148"
        ry="254.3"
        fill="var(--polkadot-purple)"
      />
      <ellipse
        transform="matrix(0.866 -0.5 0.5 0.866 -59.8007 629.9254)"
        className="st0"
        cx="1145.6"
        cy="426.6"
        rx="147.9"
        ry="254.3"
        fill="var(--polkadot-purple)"
      />
    </svg>
  );
}

export function TestLogo(props: React.SVGProps<SVGSVGElement>) {
  const centerX = 200;
  const centerY = 200;
  const outerRadius = 80;
  const dotRadius = 7;

  function createCircle(radius: number, numDots: number) {
    return Array.from({ length: numDots }, (_, i) => {
      const angle = (i * 2 * Math.PI) / numDots;
      const x = centerX + radius * Math.cos(angle + Math.PI / 2);
      const y = centerY + radius * Math.sin(angle + Math.PI / 2);
      return { x, y, fill: i % 2 === 0 ? "#552bbf" : "#552bbf" };
    });
  }

  const innerRadius = outerRadius / 3;
  const middleRadius = (2 * outerRadius) / 3;

  const centerDot = [{ x: centerX, y: centerY, fill: "var(--polkadot-pink)" }];
  const innerDots = createCircle(innerRadius, 6);
  const middleDots = createCircle(middleRadius, 10);
  const outerDots = createCircle(outerRadius, 14);

  return (
    <div className="group w-[400px] h-[400px] relative flex items-center justify-center">
      <span className="text-white text-[180px] font-bold leading-[180px] group-hover:animate-spin-slow">
        S
      </span>
      <svg
        width="400"
        height="400"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute mix-blend-difference"
      >
        <g id="logo">
          <g id="concentric-circles">
            {[centerDot, innerDots, middleDots, outerDots].flatMap(
              (circle, circleIndex) =>
                circle.map((dot, dotIndex) => (
                  <circle
                    className="mix-blend-difference hover:fill-white animate-colors duration-1000"
                    key={`${circleIndex}-${dotIndex}`}
                    cx={dot.x}
                    cy={dot.y}
                    r={dotRadius}
                    fill={dot.fill}
                  />
                ))
            )}
          </g>
        </g>
      </svg>
    </div>
  );
}

export function CubeLogo(props: React.SVGProps<SVGSVGElement>) {
  const size = 200;
  const center = size / 2;
  const cubeSize = 120;
  const dotRadius = 4;
  const dotsPerEdge = 5;

  function createEdge(start: [number, number], end: [number, number]) {
    return Array.from({ length: dotsPerEdge }, (_, i) => ({
      x: start[0] + (end[0] - start[0]) * (i / (dotsPerEdge - 1)),
      y: start[1] + (end[1] - start[1]) * (i / (dotsPerEdge - 1))
    }));
  }

  const centerPoint: [number, number] = [center, center];
  const bottomPoint: [number, number] = [center, center + cubeSize / 2];
  const topLeftPoint: [number, number] = [
    center - cubeSize / 2,
    center - cubeSize / 4
  ];
  const topRightPoint: [number, number] = [
    center + cubeSize / 2,
    center - cubeSize / 4
  ];

  const edges = [
    createEdge(centerPoint, bottomPoint),
    createEdge(centerPoint, topLeftPoint),
    createEdge(centerPoint, topRightPoint),
    createEdge(bottomPoint, [
      bottomPoint[0] - cubeSize / 2,
      bottomPoint[1] - cubeSize / 4
    ]),
    createEdge(bottomPoint, [
      bottomPoint[0] + cubeSize / 2,
      bottomPoint[1] - cubeSize / 4
    ]),
    createEdge(topLeftPoint, [
      topLeftPoint[0],
      topLeftPoint[1] + (cubeSize * 3) / 4
    ])
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} {...props}>
      <g id="cube-logo">
        {edges.flat().map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={dotRadius}
            fill={index % 2 === 0 ? "var(--polkadot-pink)" : "#552bbf"}
          />
        ))}
      </g>
    </svg>
  );
}

export function PolkadotStudyLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="200"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-graduation-cap"
        transform="translate(58,58) scale(3.5)"
        fill="none"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </g>

      {/* <circle cx="100" cy="100" r="25" fill="none" stroke-width="6" />

      <circle cx="100" cy="100" r="40" fill="none" stroke-width="6" /> */}

      {/* <circle cx="100" cy="100" r="40" fill="none" stroke-width="4" /> */}

      {/* <circle cx="100" cy="65" r="4" />
      <circle cx="115.5" cy="70" r="4" />
      <circle cx="130" cy="82.5" r="4" />
      <circle cx="135" cy="100" r="4" />
      <circle cx="130" cy="117.5" r="4" />
      <circle cx="115.5" cy="130" r="4" />
      <circle cx="100" cy="135" r="4" />
      <circle cx="84.5" cy="130" r="4" />
      <circle cx="70" cy="117.5" r="4" />
      <circle cx="65" cy="100" r="4" />
      <circle cx="70" cy="82.5" r="4" />
      <circle cx="84.5" cy="70" r="4" /> */}
      <g className="group-hover:animate-spin-slow origin-center">
        <circle cx="100" cy="40" r="8" fill="#e6007a" stroke="none" />
        <circle cx="130" cy="50" r="8" stroke="none" />
        <circle cx="150" cy="70" r="8" fill="#e6007a" stroke="none" />
        <circle cx="160" cy="100" r="8" stroke="none" />
        <circle cx="150" cy="130" r="8" fill="#e6007a" stroke="none" />
        <circle cx="130" cy="150" r="8" stroke="none" />
        <circle cx="100" cy="160" r="8" fill="#e6007a" stroke="none" />
        <circle cx="70" cy="150" r="8" stroke="none" />
        <circle cx="50" cy="130" r="8" fill="#e6007a" stroke="none" />
        <circle cx="40" cy="100" r="8" stroke="none" />
        <circle cx="50" cy="70" r="8" fill="#e6007a" stroke="none" />
        <circle cx="70" cy="50" r="8" stroke="none" />
      </g>
    </svg>
  );
}

export function PolkadotJsLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="15 15 140 140"
      className="polkadot-logo"
      {...props}
    >
      <g>
        <circle fill="#FF8C00" cx="85" cy="85" r="70"></circle>
        <g>
          <path
            fill="#FFFFFF"
            d="M85,34.7c-20.8,0-37.8,16.9-37.8,37.8c0,4.2,0.7,8.3,2,12.3c0.9,2.7,3.9,4.2,6.7,3.3c2.7-0.9,4.2-3.9,3.3-6.7 c-1.1-3.1-1.6-6.4-1.5-9.7C58.1,57.6,69.5,46,83.6,45.3c15.7-0.8,28.7,11.7,28.7,27.2c0,14.5-11.4,26.4-25.7,27.2 c0,0-5.3,0.3-7.9,0.7c-1.3,0.2-2.3,0.4-3,0.5c-0.3,0.1-0.6-0.2-0.5-0.5l0.9-4.4L81,73.4c0.6-2.8-1.2-5.6-4-6.2 c-2.8-0.6-5.6,1.2-6.2,4c0,0-11.8,55-11.9,55.6c-0.6,2.8,1.2,5.6,4,6.2c2.8,0.6,5.6-1.2,6.2-4c0.1-0.6,1.7-7.9,1.7-7.9 c1.2-5.6,5.8-9.7,11.2-10.4c1.2-0.2,5.9-0.5,5.9-0.5c19.5-1.5,34.9-17.8,34.9-37.7C122.8,51.6,105.8,34.7,85,34.7z M87.7,121.7 c-3.4-0.7-6.8,1.4-7.5,4.9c-0.7,3.4,1.4,6.8,4.9,7.5c3.4,0.7,6.8-1.4,7.5-4.9C93.3,125.7,91.2,122.4,87.7,121.7z"
          ></path>
        </g>
      </g>
    </svg>
  );
}
