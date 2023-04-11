import { RootLayout } from '@/layouts/RootLayout'

export const Demo2 = () => {
	return (
		
		<RootLayout>
		{/*	<canvas className={'w-full h-full'}>*/}
		{/*		*/}
		{/*		<Persp*/}
		{/*		*/}
		{/*	</canvas>*/}
		{/*</RootLayout>*/}
		{/*				camera = new THREE.PerspectiveCamera( 80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000 );*/}
		{/*		camera.position.z = 1000;*/}
		
		{/*		scene = new THREE.Scene();*/}
		
		{/*		const parameters = [[ 0.25, 0xff7700, 1 ], [ 0.5, 0xff9900, 1 ], [ 0.75, 0xffaa00, 0.75 ], [ 1, 0xffaa00, 0.5 ], [ 1.25, 0x000833, 0.8 ],*/}
		{/*			[ 3.0, 0xaaaaaa, 0.75 ], [ 3.5, 0xffffff, 0.5 ], [ 4.5, 0xffffff, 0.25 ], [ 5.5, 0xffffff, 0.125 ]];*/}
		
		{/*		const geometry = createGeometry();*/}
		
		{/*		for ( let i = 0; i < parameters.length; ++ i ) {*/}
		
		{/*			const p = parameters[ i ];*/}
		
		{/*			const material = new THREE.LineBasicMaterial( { color: p[ 1 ], opacity: p[ 2 ] } );*/}
		
		{/*			const line = new THREE.LineSegments( geometry, material );*/}
		{/*			line.scale.x = line.scale.y = line.scale.z = p[ 0 ];*/}
		{/*			line.userData.originalScale = p[ 0 ];*/}
		{/*			line.rotation.y = Math.random() * Math.PI;*/}
		{/*			line.updateMatrix();*/}
		{/*			scene.add( line );*/}
		
		{/*		}*/}
		
		{/*		renderer = new THREE.WebGLRenderer( { antialias: true } );*/}
		{/*		renderer.setPixelRatio( window.devicePixelRatio );*/}
		{/*		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT )*/}
		
		</RootLayout>
	)
}

export default Demo2
